import React from "react";
import ReactDOM from "react-dom";
import YouTube from 'react-youtube';
import io from "socket.io-client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: "Dg4617nWKmQ",
      playing: false,
      target: null
    };

    this.onReady = this.onReady.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    const socket = io('http://localhost:3000');
    socket.on('message', message => {
      console.log(message);
    });
  }

  onReady(event) {
    // access to player in all event handlers via event.target
    console.log("video is ready!")
    this.state.target = event.target;
    event.target.pauseVideo();
  }

  handlePlay(event) {
    console.log("video is playing!")
    //console.log(event.target);
    //console.log(this.state.target);
  }

  handlePause(event) {
    console.log("video is paused!")
  }

  play() {
    this.state.target.playVideo();
  }

  stop() {
    this.state.target.pauseVideo();
  }

  render() {
    const opts = {
      height: '512',
      width: '720',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
    <div>
      <YouTube
      id="player"
      videoId={this.state.video}
      onReady={this.onReady}
      onPlay={this.handlePlay}
      onPause={this.handlePause}
      />
      <button onClick={this.play.bind(this)}>Start</button>
      <button onClick={this.stop.bind(this)}>Stop</button>
    </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);