import React, { Component } from 'react';
import TopTile from "./TopTile";
import '../style/QuestionTile.css';
import { Container , Row, Col, Button } from "react-bootstrap";

class GameBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            questions: {},

        };
    }

    questionChosen = (category, value) => {
        console.log('Chosen: ' + category + " for " + value)
    }

    render () {
        return (
            <Container style={{backgroundColor: "gray", marginTop: "0.5em", padding: "0.5em"}}>
                <Row style={{display: "flex", flexWrap: "wrap", minHeight: "10em", marginBottom:"-3em"}}>
                    {this.props.categories.map((catName) => {
                        return (<TopTile category={catName} />)
                    })}
                </Row>
                {[200, 400, 600, 800, 1000].map((value) => {
                    return (
                        <Row>
                            {this.props.categories.map((catName) => {
                                return (
                                    <Col>
                                        <button 
                                            className="question-tile" 
                                            onClick={() => this.questionChosen(catName, value)}>
                                            {value}
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