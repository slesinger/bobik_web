import React, { Component } from 'react'
import './StatusBar.css'

class StatusBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transcript: ""
    }
  }

  componentDidMount() {
  }

  resolveConnectionColor = () => {
    if (this.props.connectionStatus === "Připojeno") {
      return "text-success"
    } else if (this.props.connectionStatus === "Chyba připoj") {
      return "text-danger"
    } else if (this.props.connectionStatus === "Odpojeno") {
      return "text-muted"
    } else {
      return "text-warning"
    }
  }

  // To add swipe action to tabs: https://stackoverflow.com/questions/28252089/add-swipe-support-for-bootstrap-tabs
  render() {

    return <div className="bg-dark position-absolute fixed-bottom text-muted">
      <div className="container">
        <div className="row">
          <div className={"col " + this.resolveConnectionColor()}>
            {this.props.connectionStatus}
          </div>
          <div className="col">
            a1
          </div>
          <div className="col">
            a2
          </div>
        </div>
      </div>
    </div>
  }
}
export default StatusBar