import React from "react";
import ReactDOM from "react-dom";
import YouTube from 'react-youtube';


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

  onReady(event) {
    // access to player in all event handlers via event.target
    console.log("video is ready!")
    this.state.target = event.target;
    event.target.pauseVideo();
  }

  handlePlay(event) {
    console.log("video is playing!")
    console.log(event.target);
    console.log(this.state.target);
  }

  handlePause(event) {
    console.log("video is paused!")
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
      {/* <iframe width="720" height="515"
        src = {`https://www.youtube.com/embed/${this.state.video}`}         
        allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen" 
        msallowfullscreen="msallowfullscreen" 
        oallowfullscreen="oallowfullscreen" 
        webkitallowfullscreen="webkitallowfullscreen"
        onStateChange={this.handdleStateChange}>
      </iframe> */}
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