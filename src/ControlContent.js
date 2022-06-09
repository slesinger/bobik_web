import React, { Component } from 'react'
import './ControlContent.css'

class ControlContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transcript: ""
    }
  }

  componentDidMount() {
  }

  // To add swipe action to tabs: https://stackoverflow.com/questions/28252089/add-swipe-support-for-bootstrap-tabs
  render() {
    return <div>
      <h1>Ovladac</h1>
    </div>
  }
}
export default ControlContent;