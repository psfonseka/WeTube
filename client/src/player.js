import React from "react";
import YouTube from 'react-youtube';
import io from "socket.io-client";
import Chat from "./chat";

const socket = io('http://localhost:3000');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
      target: null,
      mutatable: true,
      vidEntry: "",
      startRun: false,
      startTime: 0,

    };

    this.onReady = this.onReady.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTime = this.setTime.bind(this);
    this.test = this.test.bind(this);
  }

  componentDidMount() {
    socket.on('video', video => {
      this.setState({
        video: video.id,
        startRun: video.playing,
        startTime: video.time
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
    });
  }

  onReady(event) {
    console.log("video is ready!")
    this.state.target = event.target;
    let state = this.state
    let setTime = this.setTime;
    if (this.state.startRun) {
      state.mutatable = false;
      setTimeout(function(){ 
        state.target.playVideo();
        state.target.seekTo(state.startTime);
      }, 1000);
    }
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
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      vidEntry: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let entry = this.state.vidEntry;
    let split = entry.split("=");
    if (split.length === 2) {
      socket.emit('video', split[1]);
    } else if (split.length === 1 && split[0].length === 11) {
      socket.emit('video', split[0]);
    } else {
      console.log("error!");
    }
    this.setState({
      vidEntry: ""
    });
  }

  setTime(time) {
    this.state.target.seekTo(time);
  }

  test() {
    socket.emit('video', "NL6CDFn2i3I");
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
    <div className="container">
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Link a Video to Watch:
            <input type="text" value={this.state.vidEntry} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <YouTube
        id="player"
        videoId={this.state.video}
        onReady={this.onReady}
        onPlay={this.handlePlay}
        onPause={this.handlePause}
        />
        <button onClick={this.test}>Test</button>
      </div>
      <Chat/>
    </div>
    );
  }
}

export default App;