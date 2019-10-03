const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('./client/dist'))

//app.get('/', (req, res) => res.send('Hello World!'))

io.on('connection', (client) => {
    //console.log('a user connected:', client);
    console.log('a user connected');
 });
setInterval(() => {
io.send('hello world');
}, 1000);


http.listen(port, () => console.log(`Example app listening on port ${port}!`))