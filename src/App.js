import React, { Component } from 'react'
import './App.css'
import SttInput from './SttInput'
import ChatContent from './ChatContent'
import MapContent from './MapContent'
import CameraContent from './CameraContent'
import ActionContent from './ActionContent'
import ControlContent from './ControlContent'
import StatusBar from './StatusBar'
import ROSLIB from 'roslib'

class App extends Component {

  ros

  constructor(props) {
    super(props)
    this.chatContentChild = React.createRef()

    this.state = {
      connectionStatus: "disconnected",
    }

    this.ros = new ROSLIB.Ros({
      url: 'wss://ha.doma:9090'
    })

    this.ros.on('connection', () => {
      this.setState({ connectionStatus: "Připojeno" })
    })

    this.ros.on('error', (error) => {
      this.setState({ connectionStatus: "Chyba připoj" })
    })

    this.ros.on('close', () => {
      this.setState({ connectionStatus: "Odpojeno" })
    })
  }

  componentDidMount() {
  }

  submitInput = (text) => {
    document.querySelector('#img-submit').src = '/dash/images/submit.gif'

    this.chatContentChild.current.addHumanMessage(text);

    var humanQueryClient = new ROSLIB.Service({
      ros: this.ros,
      name: '/human_query',
      serviceType: 'bobik_interfaces/srv/HumanQuery'
    })

    var request = new ROSLIB.ServiceRequest({
      query: text
    })

    humanQueryClient.callService(request, (result) => {
      document.querySelector('#img-submit').src = '/dash/images/submit-1.gif'
      this.chatContentChild.current.addRobotMessage(result.reply);

    })
  }

  render() {

    return <div className="container-md, App">
      <SttInput submitInput={this.submitInput} />

      <div>
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <button className="nav-link active" role="tab" data-bs-toggle="pill" data-bs-target="#tab-chat">Chat</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" role="tab" data-bs-toggle="pill" data-bs-target="#tab-map">Mapa</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" role="tab" data-bs-toggle="pill" data-bs-target="#tab-camera">Kamera</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" role="tab" data-bs-toggle="pill" data-bs-target="#tab-action" >Akce</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" role="tab" data-bs-toggle="pill" data-bs-target="#tab-control" tabIndex="-1">Ovládání</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="tab-chat" role="tabpanel" aria-labelledby="chat-tab"><ChatContent ref={this.chatContentChild} /></div>
          <div className="tab-pane fade" id="tab-map" role="tabpanel" aria-labelledby="map-tab"><MapContent /></div>
          <div className="tab-pane fade" id="tab-camera" role="tabpanel" aria-labelledby="camera-tab"><CameraContent /></div>
          <div className="tab-pane fade" id="tab-action" role="tabpanel" aria-labelledby="action-tab"><ActionContent ros={this.ros}/></div>
          <div className="tab-pane fade" id="tab-control" role="tabpanel" aria-labelledby="control-tab"><ControlContent /></div>
        </div>
      </div>

      <StatusBar connectionStatus={this.state.connectionStatus}/>

    </div>
  }

}

export default App
