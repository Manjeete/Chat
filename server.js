const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/",(req,res) =>{
    res.status(200).json({
        status:true,
        msg:"Hello"
    })
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    const room_id = 123;
    io.on('connection', (socket) => {
        console.log("user connected")
        socket.on(`server ${room_id}`, (msg) => {
        io.emit(`receiver ${room_id}`, msg);
        });
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});