var socket = io();

function scrollToBottom(){
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Height
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    };
};

socket.on('connect',function (){
    console.log('Connected to server');
    var params = jQuery.deparam(window.location.search);
    socket.emit('join',params, function(err){
        if(err){
            alert(err);
            window.location.href="/";
        }else{
            console.log('No Error');
        }
    });
});
socket.on('disconnect',function (){
    console.log('Disconnected from server');
});

socket.on('roomsList',function (rooms){
    console.log(rooms);
});

socket.on('updateUserList',function (users){
    var ol = jQuery('<ol></ol>');
    users.forEach( function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);

})

socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
/*     
    console.log('Got new message',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} @${formattedTime}: ${message.text}`);
    jQuery('#messages').append(li); */

});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    
    jQuery('#messages').append(html);
    scrollToBottom();
    /* var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} @${formattedTime}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li); */
})

var messsageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        text: messsageTextBox.val()
    },function(){
        messsageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click',function (){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser!');
    };

    locationButton.attr('disabled','disabled').text('Sending location');

    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');;
    },function (){
        locationButton.removeAttr('disabled').text('Send location');;
        return alert('Unable to fetch location!');
    });
});