import React, { Component } from 'react';
import TopTile from "./TopTile";
import '../style/style.css';
import { Container , Row, Col } from "react-bootstrap";
// import socketIOClient from "socket.io-client";
import firebase from '../Firebase'

class GameBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            game: {},
            questionsDone: new Set([]),
            questionInProgress: {},
            player1: 0,
            player2: 0,
            player3: 0,
            currentRound: "jeopardy",
            firstBuzz: ""
        };

        // this.socket = ""
        this.db = firebase.firestore();
        this.gameref = this.db.collection("currentGames").doc(this.props.gameCode);
    }

    componentDidMount() {
        // const url = '/games/' + this.props.date;
        // fetch(url, {method: 'GET'})
        //     .then(data => data.json())
        //     .then(json => this.setState({game: json}))
        // var docRef = this.db.collection("games").doc(this.props.date);
        var dataref = this.db.collection("games").doc(this.props.date);
        dataref.get().then(function(doc) {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                return doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).then((data) => this.setState({game: data})).catch(function(error) {
            console.log("Error getting document:", error);
        });

        this.gameref.onSnapshot((doc) => {
            if (!doc.exists) {
                // console.log("Document data:", doc.data());
                return;
            }
            var data = doc.data()
            if (data['buzzer'] === "1" || data['buzzer'] === "2" || data['buzzer'] === "3") {
                this.setState({ firstBuzz: data['buzzer'] })
            }
        });
    }

    questionChosen = (round, category, value) => {
        console.log('Chosen: ' + category + " for " + value)
        console.log(this.state.game[round][category][value]["question"])
        console.log("Answer: " + this.state.game[round][category][value]["answer"])

        if (this.state.questionsDone.size === 29) {
            console.log("jeopardy round over")
            this.setState({currentRound: "doubleJeopardy"})
        } else if (this.state.questionsDone.size === 59) {
            console.log("double jeopardy round over")
            this.setState({currentRound: "finalJeopardy"})
        }

        const currentQuestion = { round: round,
                                category: category,
                                value: value }

        this.setState(prevState => ({questionsDone: prevState.questionsDone.add(category + value),
                                    questionInProgress: currentQuestion,
                                    firstBuzz: "" }))

        // fetch('/answer', {
        //     method: 'POST',
        //     body: JSON.stringify({ round: round,
        //         category: category,
        //         value: value })
        // })

        // this.socket.emit('new question', { question: this.state.game[round][category][value]["question"],
        //                                     answer: this.state.game[round][category][value]["answer"]});

        this.gameref.set({currentQuestion: this.state.game[round][category][value]["question"],
                        currentAnswer: this.state.game[round][category][value]["answer"],
                        buzzer: "closed"})

    }

    questionAnswered = (value, player) => {
        this.setState(prevState => ({questionInProgress: {},
                                    [player]: prevState[player] + parseInt(value.substring(1)) }))
        console.log(`${player} gets ${value}!`)
    }

    questionAnsweredWrong = (value, player) => {
        this.setState(prevState => ({[player]: prevState[player] - parseInt(value.substring(1)) }))
        console.log(`${player} loses ${value}!`)
    }

    questionNotAnswered = () => {
        this.setState(prevState => ({questionInProgress: {}}))
    }

    readyForBuzz = () => {
        // this.socket.emit('reset buzzer', {});
        this.setState({firstBuzz: ""})
        this.gameref.set({
            buzzer: "open"
        }, { merge: true });
    }

    render () {
        // if (!this.state.game.hasOwnProperty("jeopardy")) {
        //     fetch('localhost:3001/dates')
        //     .then((res) => console.log())
        //     return ( 
        //         <div>please choose game.</div>
        //     )
        // }
        if (!this.state.game.hasOwnProperty("jeopardy")) {
            return ( <div> loading game </div>)
        }

        if (this.state.questionInProgress.hasOwnProperty("round")) {
            return ( 
                <div className="question-screen">
                    <div >
                        {this.state.game[this.state.questionInProgress.round][this.state.questionInProgress.category][this.state.questionInProgress.value]["question"]} 
                    </div>
                    <div className="first-buzz">
                        {this.state.firstBuzz ? `Player ${this.state.firstBuzz}!` : null}
                    </div>
                    <div >
                        <button className="player-button" onClick={() => this.questionAnswered(this.state.questionInProgress.value, "player1")}>Player 1 Right</button>
                        <button className="player-button" onClick={() => this.questionAnswered(this.state.questionInProgress.value, "player2")}>Player 2 Right</button>
                        <button className="player-button" onClick={() => this.questionAnswered(this.state.questionInProgress.value, "player3")}>Player 3 Right</button>
                    </div>

                    <div>
                        <button className="player-button2" onClick={() => this.questionAnsweredWrong(this.state.questionInProgress.value, "player1")}>Player 1 Wrong</button>
                        <button className="player-button2" onClick={() => this.questionAnsweredWrong(this.state.questionInProgress.value, "player2")}>Player 2 Wrong</button>
                        <button className="player-button2" onClick={() => this.questionAnsweredWrong(this.state.questionInProgress.value, "player3")}>Player 3 Wrong</button>
                    </div>
                    <div>
                        <button className="player-button2" onClick={() => this.questionNotAnswered()}>No Answer</button>
                    </div>
                    <div>
                        <button className="player-button2" onClick={() => this.readyForBuzz()}>Ready For Buzz</button>
                    </div>
                </div>
            )
        }

        if (this.state.currentRound === 'finalJeopardy') {
            return (
                <div className="question-screen">
                    <div>
                        {this.state.game.finalJeopardy["category"]}
                    </div>
                    <div>
                        <button className="player-button" onClick={() => this.setState({currentRound: 'finalJeopardyQuestion'})}>Continue</button>
                    </div>
                </div>
            )
        } else if (this.state.currentRound === 'finalJeopardyQuestion') {
            console.log("Answer: " + this.state.game.finalJeopardy["answer"])
            return (
                <div className="question-screen">
                        <div>
                            {this.state.game.finalJeopardy["question"]}
                        </div>
                        <div>
                            <button className="player-button" onClick={() => this.setState({currentRound: 'finalJeopardyAnswer'})}>Show Answer</button>
                        </div>
                </div>
            )
        } else if (this.state.currentRound === 'finalJeopardyAnswer') {
            return (
                <div className="question-screen">
                        <div>
                            {this.state.game.finalJeopardy["answer"]}
                        </div>
                </div>
            )
        }

        var values = [];
        if (this.state.currentRound === 'jeopardy') {
            values = ["$200", "$400", "$600", "$800", "$1000"]
        } else if (this.state.currentRound === 'doubleJeopardy') {
            values = ["$400", "$800", "$1200", "$1600", "$2000"]
        }

        return (
            <Container style={{backgroundColor: "gray", marginTop: "0.5em", padding: "0.5em"}}>
                <Row style={{display: "flex", flexWrap: "wrap", minHeight: "10em", marginBottom:"-3em"}}>
                    {Object.keys(this.state.game[this.state.currentRound]).map((catName, index) => {
                        return (<TopTile category={catName} key={index} />)
                    })}
                </Row>
                {
                    values.map((value, index1) => {
                        return (
                            <Row key={index1}>
                                {Object.keys(this.state.game[this.state.currentRound]).map((catName, index2) => {
                                    return (
                                        <Col key={index2} >
                                            <button 
                                                className="question-tile" 
                                                onClick={() => this.questionChosen(this.state.currentRound, catName, value)}>
                                                {this.state.questionsDone.has(catName + value) ? "" : value}
                                            </button>
                                        </Col>
                                    )
                                })}
                            </Row>)
                })}
                <Row className="scores">
                    <Col>Player 1: ${this.state.player1}</Col>
                    <Col>Player 2: ${this.state.player2}</Col>
                    <Col>Player 3: ${this.state.player3}</Col>
                </Row>
                <Row className="scores">
                    <Col>
                        <h2>Game Code: {this.props.gameCode}</h2>
                    </Col>
                </Row>

            </Container>
        )
    }
}

export default GameBoard;