var socket = io();
socket.on('connect',function (){
    console.log('Connected to server');
    /* socket.emit('createEmail',{
        to: 'neel@reve.com',
        text: 'Hey. This is Mirza'
    }); */
    socket.emit('createMessage',{
        to:'Majhi',
        text: 'Baitja Kopila!'
    })
});
socket.on('disconnect',function (){
    console.log('Disconnected from server');
});

/* socket.on('newEmail',function(email){
    console.log('New Email',email);
});
 */
socket.on('newMessage',function(message){
    console.log('Got new message',message);
});