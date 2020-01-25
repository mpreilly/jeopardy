import React, { Component } from 'react';
// import socketIOClient from 'socket.io-client';
import firebase from '../Firebase'


class AnswerScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: "",
            answer: ""
        }

        // this.socket = ""
        this.db = firebase.firestore();
        this.gameref = this.db.collection("currentGames").doc("1");
    }

    componentDidMount() {
        // const socket = socketIOClient.connect('http://192.168.86.37:3000/trebek');
        // const socket = socketIOClient.connect('localhost:3000/trebek');
        // socket.on("new question", data => this.setState(data))
        var data = {}
        this.gameref.onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
            data = doc.data()
            this.setState({question: data['currentQuestion'], answer: data['currentAnswer']})
        });
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