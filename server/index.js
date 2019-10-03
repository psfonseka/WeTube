const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('./client/dist'))

//app.get('/', (req, res) => res.send('Hello World!'))
let time = 0;
let timeAdded = null;
let video = {
    id: "Dg4617nWKmQ",
    time: time
};
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
        if (action.state === "start") {

        } else {
            timeAdded = null;
        }
        time = action.time;
        socket.broadcast.emit('action', action);
    });
    socket.on('video', function(newVideo){
        video.id = newVideo;
        video.time = 0;
        time = 0;
        io.emit('video',video);
        
    });
});
// setInterval(() => {
// io.send('hello world');
// }, 1000);


http.listen(port, () => console.log(`Example app listening on port ${port}!`))