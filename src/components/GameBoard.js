import React, { Component } from 'react';
import TopTile from "./TopTile";
import '../style/QuestionTile.css';
import { Container , Row, Col, Button } from "react-bootstrap";

class GameBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            game: {},
            questionsDone: new Set([])

        };
    }

    componentDidMount() {
        fetch('/games/2010-07-06', {method: 'GET'})
            .then(data => data.json())
            .then(json => this.setState({game: json}))
    }   

    loadGame = () => {

    }

    questionChosen = (round, category, value) => {
        console.log('Chosen: ' + category + " for " + value)
        console.log(this.state.game[round][category][value]["question"])
        this.setState(prevState => ({questionsDone: prevState.questionsDone.add(category + value)}))
        if (this.state.questionsDone.size === 30) {
            console.log("round over")
        }
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
        return (
            <Container style={{backgroundColor: "gray", marginTop: "0.5em", padding: "0.5em"}}>
                <Row style={{display: "flex", flexWrap: "wrap", minHeight: "10em", marginBottom:"-3em"}}>
                    {Object.keys(this.state.game.jeopardy).map((catName) => {
                        return (<TopTile category={catName} />)
                    })}
                </Row>
                {["$200", "$400", "$600", "$800", "$1000"].map((value) => {
                    return (
                        <Row>
                            {Object.keys(this.state.game.jeopardy).map((catName) => {
                                return (
                                    <Col>
                                        <button 
                                            className="question-tile" 
                                            onClick={() => this.questionChosen("jeopardy", catName, value)}>
                                            {this.state.questionsDone.has(catName + value) ? "" : value}
                                        </button>
                                    </Col>
                                )
                            })}
                        </Row>)
                })}

            </Container>
        )
    }
}

export default GameBoard;