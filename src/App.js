import React, { Component } from 'react'
import './App.css'
import SttInput from './SttInput';

// let ref = window.location.hostname
// const baseUrl = (ref === 'localhost') ? 'http://ha.doma:9999/.netlify/functions' : '/.netlify/functions'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
    // this.handleClear = this.handleClear.bind(this)
  }

  componentDidMount() {
    // fetch(baseUrl + '/tags')
    // .then((result) => result.json())
    // .then((result) => {
    // this.setState({
    // suggestions: result,
    // })
    // })

    // setTimeout(() => this.setupjs(), 800)  // terrible workaround due to auth refresh page
  }

  handleClear() {
    // this.setState({
    // tags: [],
    // }, () => this.search())
    // let triggerEl = document.querySelector('#pills-tab button#pills-seznam-tab')
    // let inst = window.bootstrap.Tab.getInstance(triggerEl)
    // if (inst !== null)
    // inst.show()
  }

  render() {

    return <div className="App mt-5">
      <h1>Bobik</h1>
      <SttInput />
    </div>
  }

}

export default App
