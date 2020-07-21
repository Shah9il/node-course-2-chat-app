const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });    
});


server.listen(port,()=>{
    console.log(`Server is up at port ${port}`);
});
