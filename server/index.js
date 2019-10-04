const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('./client/dist'))

//app.get('/', (req, res) => res.send('Hello World!'))
let timeCheck = null;
let video = {
    id: "Dg4617nWKmQ",
    time: 0,
    playing: false
};
io.on('connection', (socket) => {
    //console.log('a user connected:', client);
    console.log('a user connected');
    if (video.playing) {
        let temp = new Date();
        let difference = temp.getTime()-timeCheck;
        video.time = difference/1000 + video.time;
        timeCheck = temp.getTime();
    }
    socket.emit('video', video);
    console.log(video.playing);
    if (video.playing) {
        console.log("happened");
        console.log(video.time);
        setTimeout(function(){ 
            socket.emit('action', {state: "start", time: video.time+2});
        }, 2000);
    }
 
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});

io.on('connection', function(socket){
    socket.on('action', function(action){
        if (action.state === "start") {
            video.playing = true;
            video.time = action.time;
            let temp = new Date;
            timeCheck = temp.getTime();
        } else {
            video.playing = false;
        }
        video.time = action.time;
        socket.broadcast.emit('action', action);
    });
    socket.on('video', function(vidId){
        video.id = vidId;
        video.time = 0;
        io.emit('video',video);
        
    });
});


http.listen(port, () => console.log(`Example app listening on port ${port}!`))