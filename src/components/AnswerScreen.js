import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class AnswerScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: "",
            answer: ""
        }

        // this.socket = ""
    }

    componentDidMount() {
        // const socket = socketIOClient.connect('http://192.168.86.37:3000/trebek');
        const socket = socketIOClient.connect('localhost:3000/trebek');
        socket.on("new question", data => this.setState(data))
    }

    render () {
        return (
            <div>
                <h3>{this.state.question}</h3>
                <h2>{this.state.answer}</h2>
            </div>
        )
    }
}

export default AnswerScreen;