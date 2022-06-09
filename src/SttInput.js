import React, { Component } from 'react'
import './SttInput.css'

class SttInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transcript: "pocatek"
        }
    }

    startDictation = () => {
        if (window.hasOwnProperty('webkitSpeechRecognition')) {
            this.setState({ transcript: "nahravam" })
            document.querySelector('#img-mic').src = '/dash/images/mic.gif'

            this.recognition = new window.webkitSpeechRecognition();

            this.recognition.continuous = false
            this.recognition.interimResults = true
            this.recognition.maxAlternatives = 1

            this.recognition.lang = 'cs-CZ'
            this.recognition.start()

            this.recognition.onresult = this.dictationSuccess
            this.recognition.onerror = this.dictationError
        }
        else {
            alert("Your browser does not support voice recognition. Try Google Chrome.")
        }
    }

    dictationSuccess = (e) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = e.resultIndex; i < e.results.length; ++i) {
            const result = e.results[i]
            if (result.isFinal) {
                finalTranscript += result[0].transcript
            } else {
                interimTranscript += result[0].transcript
            }
        }
        if (finalTranscript) {
            document.querySelector('#img-mic').src = '/dash/images/mic-1.gif'
            this.recognition.stop()
            this.setState({ transcript: finalTranscript }, this.submitDictation)
        } else {
            this.setState({ transcript: interimTranscript })
        }
    }

    dictationError = (e) => {
        this.recognition.stop()
        document.querySelector('#img-mic').src = '/dash/images/mic-1.gif'
        this.setState({ transcript: "chyba: " + e.error })
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.setState({ transcript: document.querySelector('#rec-input').value }, this.submitDictation)
        }
    }

    submitDictation = () => {
        this.props.submitInput(this.state.transcript)
    }

    render() {
        return <div>
            <span key={this.state.transcript}>
                <input className="align-middle" type="text" id="rec-input" placeholder="Stiskni mikrofon a diktuj" onKeyDown={this.handleKeyDown} />
            </span>
            <img id="img-mic" onClick={this.startDictation} src="/dash/images/mic-1.gif" alt="microphone" />
            <img id="img-submit" onClick={this.submitDictation} src="/dash/images/submit-1.gif" alt="submit" />
            <div id="rec-transcript" className="blink-transcript">{this.state.transcript}</div>
        </div >
    };
};
export default SttInput;