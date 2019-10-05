# WeTube

## Description

This app is made to let friends watch youtube videos together. It is on a single node express server that uses Socket.IO to transfer controls (starting,stoping,changing the time) from all clients to each other. It also contains a chatbox that uses Socket.IO for live messaging.

## Instructions

First run "npm install" for installing dependencies, then do "npm run build" to compile bundle.js, and finally run "npm start" to start a localserver. Will have to make minor changes for the socket-client ip for any sort of deployment.

[Checkout the App on Heroku](https://psfonseka-we-tube.herokuapp.com/)

Credit to: 
[React-Youtube](https://www.npmjs.com/package/react-youtube)
[createapp.dev](https://createapp.dev/)
