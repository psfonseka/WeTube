const express = require('express')
const http = require("http");
const socketIo = require("socket.io");
const app = express()
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static('./client/dist'))

//app.get('/', (req, res) => res.send('Hello World!'))

io.on('connection', (client) => {
    //console.log('a user connected:', client);
    console.log('a user connected');
 });
 io.listen(8000);
 console.log('socket io is listening on port ', 8000);
 setInterval(() => {
   io.send('hello world');
 }, 1000);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))