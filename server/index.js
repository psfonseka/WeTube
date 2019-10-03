const express = require('express');
var app = express();
const port = process.env.PORT || 3000;
var server = app.listen(port);
console.log("Listening on port: " + port);
//var http = require('http').createServer(app);
var io = require('socket.io').listen(server);
io.set('origins', '*:*');

app.use(express.static('./client/dist'))

//app.get('/', (req, res) => res.send('Hello World!'))

io.on('connection', (socket) => {
    //console.log('a user connected:', client);
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
 });

 io.on('connection', function(socket){
    socket.on('action', function(action){
      //socket.broadcast.emit('action', action);
      io.emit('action', action);
    });
  });
// setInterval(() => {
// io.send('hello world');
// }, 1000);

