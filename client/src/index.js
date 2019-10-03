import React from "react";
import ReactDOM from "react-dom";
import YouTube from 'react-youtube';
import io from "socket.io-client";

const socket = io('http://localhost:3000');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
      target: null,
      mutatable: true
    };

    this.onReady = this.onReady.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  componentDidMount() {
    socket.on('video', video => {
      this.setState({
        video: video
      });
    });
    socket.on('action', action => {
      this.state.mutatable = false;
      if (action.state === "start") {
        this.state.target.playVideo();
      } else {
        this.state.target.pauseVideo();
      }
      this.setTime(action.time);
    })
  }

  onReady(event) {
    // access to player in all event handlers via event.target
    console.log("video is ready!")
    this.state.target = event.target;
    event.target.pauseVideo();
  }

  handlePlay(event) {
    console.log("video is playing!")
    if (this.state.mutatable) {
      let time = this.state.target.getCurrentTime();
      let action = {
        state: "start",
        time: time
      };
      socket.emit('action', action, (err, msg) => {
        this.state.mutatable = true;
      });
    } else {
      this.state.mutatable = true;
    }
  }

  handlePause(event) {
    console.log("video is paused!")
    if (this.state.mutatable) {
      let time = this.state.target.getCurrentTime();
      let action = {
        state: "stop",
        time: time
      };
      socket.emit('action', action, (err, msg) => {
        this.state.mutatable = true;
      });
    } else {
      this.state.mutatable = true;
    }
    // var state = this.state;
    // setTimeout(function(){ state.mutatable = true; }, 500);

  }

  setTime(time) {
    this.state.target.seekTo(time);
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
    </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);