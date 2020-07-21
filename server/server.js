const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const {generateLocationMessage} = require('./utils/message.js');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');

/*  NOTE: 
    io.emit - emits event to every single connection
    socket.emit - emits to a single connection
 */
    /* socket.emit('newMessage',{
        from: 'Kopila',
        text: 'Amare loiba majhi?',
        createdAt: 123
    }); */
    socket.emit('newMessage',generateMessage('Admin','Welcome to the ChatApp'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined!'));

    socket.on('createMessage',(message, callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('This is from server');
    });
    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });    
});


server.listen(port,()=>{
    console.log(`Server is up at port ${port}`);
});
