var express = require("express");
var app = express();
var http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

http.listen(9001, () => {

    const users = {};

    io.on('connection', socket => {
        socket.on('new-user-joined', Name => {
            users[socket.id] = Name;
            socket.broadcast.emit('user-joined', Name);
        })

        socket.on('send', message => {
            socket.broadcast.emit('receive', { message: message, Name: users[socket.id] })
        })

        socket.on('disconnect',message=>{
            socket.broadcast.emit('bye',users[socket.id]);
            delete users[socket.id];
        })

    })

})