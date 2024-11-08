// server/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  let inputData = { hosts: null, subnets: null };

  socket.emit('message', { text: 'How many hosts?' });

  socket.on('response', (message) => {
    if (inputData.hosts === null) {
      inputData.hosts = parseInt(message);
      if (isNaN(inputData.hosts) || inputData.hosts <= 0) {
        socket.emit('message', { text: 'Please enter a valid number of hosts.' });
        inputData.hosts = null;
      } else {
        socket.emit('message', { text: 'Do you want to specify the number of subnets? (yes/no)' });
      }
    } else if (inputData.subnets === null) {
      if (message.trim().toLowerCase() === 'yes') {
        socket.emit('message', { text: 'How many subnets?' });
      } else if (message.trim().toLowerCase() === 'no') {
        inputData.subnets = 1; // Default to 1 subnet if "no" is chosen
        socket.emit('calculation', inputData);
      } else if (!isNaN(parseInt(message))) {
        inputData.subnets = parseInt(message);
        socket.emit('calculation', inputData);
      } else {
        socket.emit('message', { text: 'Invalid response. Please respond with "yes" or "no", or enter a number.' });
      }
    }
  });
});

server.listen(3001, () => {
  console.log('Socket server listening on port 3001');
});
