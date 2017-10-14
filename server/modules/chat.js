const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendfile('client.html');
});

let count = 1;
io.on('connection', (socket) => {
  console.log('user connected: ', socket.id);
let name = 'user' + count++;
io.to(socket.id).emit('send name', name);

socket.on('disconnect', () => {
  console.log('user disconnected');
});

socket.on('send msg', (msg) => {
  console.log('msg: ' + msg);

io.emit('send msg', msg);
});
});


http.listen('4000', () => {
  console.log('server on');
});