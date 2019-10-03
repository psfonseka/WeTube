const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('./client/dist'))

//app.get('/', (req, res) => res.send('Hello World!'))
let video = "Dg4617nWKmQ";
io.on('connection', (socket) => {
    //console.log('a user connected:', client);
    console.log('a user connected');
    socket.emit('video', video);
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});

io.on('connection', function(socket){
    socket.on('action', function(action){
        socket.broadcast.emit('action', action);
    });
    socket.on('video', function(newVideo){
        video = newVideo;
        io.emit('video',video);
    });
});
// setInterval(() => {
// io.send('hello world');
// }, 1000);


http.listen(port, () => console.log(`Example app listening on port ${port}!`))