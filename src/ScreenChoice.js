import React, { Component } from 'react';
import App from './App';
import BuzzerScreen from './components/BuzzerScreen';
import AnswerScreen from './components/AnswerScreen';


class ScreenChoice extends Component {
  constructor(props) {
    super(props);

    this.state = { choice: "" }
  }

  render () {
    if (this.state.choice === "") {
      return (
        <div>
          <h1>Choose Screen</h1>
          <button onClick={() => {this.setState({choice: "gameboard"})}}>Game Board</button>
          <button onClick={() => {this.setState({choice: "buzzer1"})}}>Player 1</button>
          <button onClick={() => {this.setState({choice: "buzzer2"})}}>Player 2</button>
          <button onClick={() => {this.setState({choice: "buzzer3"})}}>Player 3</button>
          <button onClick={() => {this.setState({choice: "trebek"})}}>Trebek</button>
        </div>
      )
    } else if (this.state.choice === "gameboard") {
      return(<App />)
    } else if (this.state.choice === "buzzer1") {
      return(<BuzzerScreen player="1" />)
    } else if (this.state.choice === "buzzer2") {
      return(<BuzzerScreen player="2" />)
    } else if (this.state.choice === "buzzer3") {
      return(<BuzzerScreen player="3" />)
    } else if (this.state.choice === "trebek") {
      return(<AnswerScreen />)
    }
  }
}

export default ScreenChoice;