import React, { Component } from 'react';
// import socketIOClient from 'socket.io-client';
import firebase from '../Firebase'

class BuzzerScreen extends Component {
    constructor(props) {
        super(props)

        this.state = { ready: false }

        // this.socket = ""
        this.db = firebase.firestore();
        this.gameref = this.db.collection("currentGames").doc("1");
    }

    componentDidMount() {
        // this.socket = socketIOClient.connect('http://192.168.86.37:3000/buzzer');
        // this.socket = socketIOClient.connect('localhost:3000/buzzer');
        // this.socket.on("buzzer on", data => this.setState({ready: true}))
        // this.socket.on("buzzer off", data => this.setState({ready: false}))
        this.gameref.onSnapshot((doc) => {
            var data = doc.data()
            if (data['buzzer'] === "open") {
                this.setState({ ready: true })
            } else {
                this.setState({ ready: false })
            }
        });
    }

    buzzIn = (playerNumber) => {
        // this.socket.emit("buzz", {player: playerNumber})
        if (this.state.ready) {
            this.gameref.set({
                buzzer: playerNumber
            }, { merge: true });
        }
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