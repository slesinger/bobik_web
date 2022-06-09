import React, { Component } from 'react'
import './MapContent.css'

class MapContent extends Component {

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
      <img src="https://www.robotandchisel.com/assets/images/2020-08-10-rviz2.png" alt="map" />
    </div>
  }
}
export default MapContent;