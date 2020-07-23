const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const {generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');


const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');

/*  NOTE: 
    io.emit - emits event to every single connection
    socket.emit - emits to a single connection
 */

    socket.on('join',(params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room name are required!');
        };
        console.log(users.checkUsername(params.name),users.checkUsername(params.name).length);

        if(users.checkUsername(params.name).length > 0){
            return callback(`${params.name} is already taken. Please try different username!`);
        }
        var roomName = params.room.toLowerCase();
        socket.join(roomName);
        //socket.leave('The Office Fans');
        // io.emit -> io.to('The Office Fans').emit
        // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
        // socket.emit 
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,roomName);

        io.to(roomName).emit('updateUserList', users.getUserList(roomName));

        //To Emit new messages to specific into a room.
        socket.emit('newMessage',generateMessage('Admin','Welcome to the ChatApp'));
        //To emit new message into a room.
        socket.broadcast.to(roomName).emit('newMessage',generateMessage('Admin',`${params.name} has joined!`));    

        callback();
    });

    socket.on('createMessage',(message, callback)=>{
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        callback('This is from server');
    });
    socket.on('createLocationMessage',(coords)=>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
    });

    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left!`));
        }
    });    
});


server.listen(port,()=>{
    console.log(`Server is up at port ${port}`);
});
