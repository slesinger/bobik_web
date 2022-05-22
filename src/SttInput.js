import React, { Component } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './SttInput.css'

class SttInput extends Component {
  language = 'cs-CZ'
  final_transcript = ''
  recognizing = false
  ignore_onend
  start_timestamp
  recognition

  setUp() {
    if (!('webkitSpeechRecognition' in window)) {
      this.upgrade()
    } else {
      this.start_button.style.display = 'inline-block'
      this.recognition = new webkitSpeechRecognition()
      this.recognition.continuous = true
      this.recognition.interimResults = true

      this.recognition.onstart = function () {
        this.recognizing = true
        this.showInfo('info_speak_now')
        this.start_img.src = '//google.com/intl/en/chrome/assets/common/images/content/mic-animate.gif'
      }

      this.recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
          this.start_img.src = '//google.com/intl/en/chrome/assets/common/images/content/mic.gif'
          this.showInfo('info_no_speech')
          this.ignore_onend = true
        }
        if (event.error == 'audio-capture') {
          this.start_img.src = '//google.com/intl/en/chrome/assets/common/images/content/mic.gif'
          this.showInfo('info_no_microphone')
          this.ignore_onend = true
        }
        if (event.error == 'not-allowed') {
          if (event.timeStamp - this.start_timestamp < 100) {
            this.showInfo('info_blocked')
          } else {
            this.showInfo('info_denied')
          }
          this.ignore_onend = true
        }
      }

      this.recognition.onend = function () {
        this.recognizing = false
        if (this.ignore_onend) {
          return
        }
        this.start_img.src = 'images/mic.gif'
        if (!this.final_transcript) {
          this.showInfo('info_start')
          return
        }
        this.showInfo('')
        if (window.getSelection) {
          window.getSelection().removeAllRanges()
          var range = document.createRange()
          range.selectNode(document.getElementById('final_span'))
          window.getSelection().addRange(range)
        }
      }

      this.recognition.onresult = function (event) {
        var interim_transcript = ''
        if (typeof (event.results) == 'undefined') {
          this.recognition.onend = null
          this.recognition.stop()
          this.upgrade()
          return
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.final_transcript += event.results[i][0].transcript
          } else {
            interim_transcript += event.results[i][0].transcript
          }
        }
        // final_transcript = capitalize(final_transcript)
        // final_span.innerHTML = linebreak(final_transcript)
        // interim_span.innerHTML = linebreak(interim_transcript)
        this.final_span.innerHTML = this.final_transcript
        this.interim_span.innerHTML = interim_transcript
      }
    }
  }

  upgrade() { // tell user to upgrade &/or use Chrome
    this.start_button.style.visibility = 'hidden'
    this.showInfo('info_upgrade')
  }

  startButton(event) {
    if (this.recognizing) {
      this.recognition.stop()
      return
    }
    this.final_transcript = ''
    this.recognition.lang = this.language
    this.recognition.start()
    this.ignore_onend = false
    this.final_span.innerHTML = ''
    this.interim_span.innerHTML = ''
    this.start_img.src = '//google.com/intl/en/chrome/assets/common/images/content/mic-slash.gif'
    this.showInfo('info_allow')
    this.start_timestamp = event.timeStamp
  }

  showInfo(info_id) {

    // try: comment out the contents of this function

    if (info_id) {
      for (var child = this.info.firstChild; child; child = child.nextSibling) {
        if (child.style) {
          child.style.display = child.id == info_id ? 'inline' : 'none'
        }
      }
      this.info.style.visibility = 'visible'
    } else {
      this.info.style.visibility = 'hidden'
    }
  }

  render() {
    this.showInfo('info_start')
    this.setUp()
    // start listening right away, so it's completely hands-free
    this.startButton()  //event as parameter


    return <div className="App mt-5">
      <h1>Bobik</h1>

      <div id="info">
        <p id="info_start">Click on the microphone icon to stop/begin speaking.</p>
        <p id="info_speak_now" style={{ display: 'none' }}>Speak now.</p>
        <p id="info_no_speech" style={{ display: 'none' }}>No speech was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&ampanswer=1407892">microphone settings</a>.</p>
        <p id="info_no_microphone" style={{ display: 'none' }}>No microphone was found. Ensure that a microphone is installed and that <a href="//support.google.com/chrome/bin/answer.py?hl=en&ampanswer=1407892">microphone settings</a> are configured correctly.</p>
        <p id="info_allow" style={{ display: 'none' }}>Click the "Allow" button above to enable your microphone.</p>
        <p id="info_denied" style={{ display: 'none' }}>Permission to use microphone was denied.</p>
        <p id="info_blocked" style={{ display: 'none' }}>Permission to use microphone is blocked. To change, go to chrome://settings/contentExceptions#media-stream</p>
        <p id="info_upgrade" style={{ display: 'none' }}>Web Speech API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome">Chrome</a> version 25 or later.</p>
      </div>

      <div id='btn'>
        <button id="start_button" onClick="startButton(event)" class='w3-button'>
          <img alt="Start" id="start_img" src="images/mic.gif" />
        </button>
      </div>

      <div id="results">
        <span class="final" id='final_span'></span>
        <span class="interim" id='interim_span'></span>
      </div>

      <button className="btn btn-primary" id="qsLoginBtn" onClick={() => alert()} type="button">
        Odeslat
      </button>
    </div>
  }


}
export default SttInput