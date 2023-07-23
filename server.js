//import express

const express = require('express');
const { Socket } = require('socket.io');


//make an express app
const app = express();


//making server using http and express
const server = require('http').Server(app);


//it will pick index.html
app.use(express.static('public'));

//integrate server with socket.io
const io = require('socket.io')(server);

io.on('connection',(socket)=>{
    console.log('connection established',socket.id);

    //socketA -> io -> socketB
    //socketA user is triggering a message event
    socket.on('message',(data)=>{//user is sending message
        io.emit('message',data);//emitting this message to all other sockets
    })

    //showing off that user left the chat
    socket.on('disconnect',()=>{
        console.log(socket.id,'->left the chat');
    })
})


const PORT = 9000;

server.listen(PORT,()=>{
console.log('server started');
})