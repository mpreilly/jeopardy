import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class BuzzerScreen extends Component {
    constructor(props) {
        super(props)

        this.state = { ready: false }

        this.socket = ""
    }

    componentDidMount() {
        this.socket = socketIOClient.connect('http://192.168.86.37:3000/buzzer');
        this.socket.on("buzzer on", data => this.setState({ready: true}))
        this.socket.on("buzzer off", data => this.setState({ready: false}))
    }

    buzzIn = (playerNumber) => {
        this.socket.emit("buzz", {player: playerNumber})
    }

    render () {
        const buzzerClass = this.state.ready ? "buzzer-button" : "buzzer-inactive"
        return (
            <div>
                <h2>Buzzer for player {this.props.player}</h2>
                <button className={buzzerClass} onClick={() => this.buzzIn(this.props.player)}>
                    {this.state.ready ? "buzz" : "not yet"}
                </button>
            </div>
        )
    }
}

export default BuzzerScreen;