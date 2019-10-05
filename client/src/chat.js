import React from "react";
import io from "socket.io-client";

const socket = io('http://localhost:3000');

class Chat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        msgEntry: "",
        messages: []
      }

      this.handleMessageChange = this.handleMessageChange.bind(this);
      this.handleMessageSend = this.handleMessageSend.bind(this);
    }

    componentDidMount() {
        socket.on('message', message => {
            let newArr = this.state.messages.slice();
            newArr.push("• " + message);
            this.setState({
              messages: newArr
            }, () => {
              var elem = document.getElementById('messages');
              elem.scrollTop = elem.scrollHeight;
            });
        });
    }

    handleMessageSend(event) {
        event.preventDefault();
        socket.emit('message', this.state.msgEntry);
        this.setState({
          msgEntry: ""
        });
    }

    handleMessageChange(event) {
        event.preventDefault();
        this.setState({
          msgEntry: event.target.value
        });
    }

    render() {
        return (
            <div className="chat-container">
            <h2>ChatBox</h2>
            <div className="messages-container" id="messages">
              {this.state.messages.map((item, i) => {
                return <div className="messages" key={i}>{item}</div>
              })}
            </div>
            <div className="message-form">
              <form onSubmit={this.handleMessageSend}>
                <label>
                  Enter a message:
                  <input type="text"value={this.state.msgEntry} onChange={this.handleMessageChange}/>
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        );
    }
}

export default Chat;