import React, { Component } from 'react'
import './ActionContent.css'
import ROSLIB from 'roslib'

class ActionContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transcript: ""
    }
  }

  callRosService = (serviceName, serviceType, serviceRequest, callback) => {
    document.querySelector('#img-submit').src = '/dash/images/submit.gif'

    var serviceClient = new ROSLIB.Service({
      ros: this.props.ros,
      name: serviceName,
      serviceType: serviceType
    })

    var request = new ROSLIB.ServiceRequest(serviceRequest)

    serviceClient.callService(request, (result) => {
      if (callback !== undefined) {
        callback(result)
      }
      else {
        this.callRosServiceFinished()
      }
    })
  }

  callRosServiceFinished = (result) => {
    document.querySelector('#img-submit').src = '/dash/images/submit-1.gif'
  }

  renderActionInput(data) {
    return <div className="accordion-item">
      <h2 className="accordion-header" id={"heading" + data.id}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + data.id} aria-expanded="false" aria-controls={"collapse" + data.id}>
          {data.heading}
        </button>
      </h2>
      <div id={"collapse" + data.id} className="accordion-collapse collapse" aria-labelledby={"heading" + data.id} data-bs-parent="#accordionExample">
        <div className="accordion-body">
          <input type="text" className="form-control" id={data.id} placeholder={data.placeholder} />
          <button className="btn btn-primary" onClick={() => {
            this.callRosService(
              data.serviceName,
              'bobik_interfaces/msg/String',
              { query: data.id },
            )
          }}>{data.buttonText}</button>
        </div>
      </div>
    </div>
  }

  renderActionButtons(data) {
    let buttons = []
    if (data.buttons !== undefined) {
      for (let i = 0; i < data.buttons.length; i++) {
        let button = data.buttons[i]
        buttons.push(<button className="btn btn-primary" style={{marginRight:"8px"}} onClick={() => {
          this.callRosService(
            button.serviceName,
            'bobik_interfaces/msg/String',
            { query: button.value },
          )
        }}>{button.text}</button>
        )
      }
    }
    return <div className="accordion-item">
      <h2 className="accordion-header" id={"heading" + data.id}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + data.id} aria-expanded="false" aria-controls={"collapse" + data.id}>
          {data.heading}
        </button>
      </h2>
      <div id={"collapse" + data.id} className="accordion-collapse collapse" aria-labelledby={"heading" + data.id} data-bs-parent="#accordionExample">
        <div className="accordion-body">
          <span style={{ paddingRight: 40 }}>{data.label}</span>
          {buttons}
        </div>
      </div>
    </div>
  }

  // To add swipe action to tabs: https://stackoverflow.com/questions/28252089/add-swipe-support-for-bootstrap-tabs
  render() {
    return <div>
      <div className="accordion" id="accordionExample">

        {this.renderActionInput({
          id: 'action_say',
          heading: "Řekni něco",
          placeholder: "co má Bobík vyslovit",
          buttonText: "Povídej",
          serviceName: "/bobik_say"
        })}

        {this.renderActionButtons({
          id: 'action_poweroff',
          heading: "Vypnout Bobika",
          label: "Opravdu vypnout?",
          buttons: [
            { text: "Vypnout", value: "poweroff", serviceName: "/bobik_poweroff" }
          ]
        })}

        {this.renderActionButtons({
          id: 'action_enableMotors',
          heading: "Zapnout/vypnout motory",
          label: "Motory",
          buttons: [
            { text: "Zapnout", value: "poweron", serviceName: "/motor_relay" },
            { text: "Vypnout", value: "poweroff", serviceName: "/motor_relay" }
          ]
        })}

      </div>
    </div>
  }
}
export default ActionContent;