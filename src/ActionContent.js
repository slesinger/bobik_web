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


  // To add swipe action to tabs: https://stackoverflow.com/questions/28252089/add-swipe-support-for-bootstrap-tabs
  render() {
    return <div>
      <div className="accordion" id="accordionExample">

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              Vypnout Bobika
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <span style={{ paddingRight: 100 }}>Opravdu vypnout?</span>
              <button className="btn btn-danger" onClick={() => {
                this.callRosService(
                  '/bobik_poweroff',
                  'bobik_interfaces/msg/String',
                  { data: 'poweroff' },
                )
              }}>Vypnout</button>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Nejak dalsi akce
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>

      </div>
    </div>
  }
}
export default ActionContent;