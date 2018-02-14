const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

app.get('/', (request, response) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

io.on('connection', socket => {
  io.sockets.emit('welcome', `👋🏼 A new user has connected 👋🏼`);

  socket.on('message', message => {
    io.sockets.emit('message', `${message.username}: ${message.text}`);
  });

  socket.on('disconnect', () => {
    io.sockets.emit('message', 'a user has disconnected');
  });
})

http.listen(process.env.PORT || 2000, () => {
  console.log('Server is Listening');
});