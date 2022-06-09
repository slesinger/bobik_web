import React, { Component } from 'react'
import './CameraContent.css'

class CameraContent extends Component {
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
      <img src="https://nimakerllc.files.wordpress.com/2018/11/leftview1.jpg" alt="robot view" />
    </div>
  }
}
export default CameraContent;