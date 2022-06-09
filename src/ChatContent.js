import React, { Component } from 'react'
import './ChatContent.css'

class ChatContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
  }

  addHumanMessage(text) {
    let messages = this.state.messages
    messages.push({ cl: 'chat-human', text: text })
    this.setState({ messages: messages })
  }

  addRobotMessage(text) {
    let messages = this.state.messages
    messages.push({ cl: 'chat-robot', text: text })
    this.setState({ messages: messages })
  }

  // To add swipe action to tabs: https://stackoverflow.com/questions/28252089/add-swipe-support-for-bootstrap-tabs
  render() {
    let messages = this.state.messages.map((message, index) => {
      return <div key={index} className={message.cl}>{message.text}</div>
    })

    return <div>
      <div className="chat-input">
        {messages}
      </div>
    </div>
  }

}
export default ChatContent;