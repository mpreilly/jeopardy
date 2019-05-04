import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class BuzzerScreen extends Component {
    constructor(props) {
        super(props)

        this.socket = ""
    }

    componentDidMount() {
        this.socket = socketIOClient.connect('http://192.168.86.37:3000/buzzer');
        // socket.on("new question", data => this.setState(data))
    }

    buzzIn = (playerNumber) => {
        this.socket.emit("buzz", {player: playerNumber})
    }

    render () {
        return (
            <div>
                <h2>Buzzer for player {this.props.player}</h2>
                <button className="buzzer-button" onClick={() => this.buzzIn(this.props.player)}>buzz</button>
            </div>
        )
    }
}

export default BuzzerScreen;