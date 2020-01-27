import React, { Component } from 'react';
import App from './App';
import BuzzerScreen from './components/BuzzerScreen';
import AnswerScreen from './components/AnswerScreen';
import firebase from './Firebase'


class ScreenChoice extends Component {
  constructor(props) {
    super(props);

    this.state = { gameCode: "",
                    gameCodeSet: false, 
                  choice: "" }
    
    this.db = firebase.firestore();
  }

  handleChange = (event) => {
    this.setState({ gameCode: event.target.value });
  }

  handleSubmit = (event) => {
    let gameref = this.db.collection("currentGames").doc(this.state.gameCode);
    gameref.get().then((doc) => {
      if (!doc.exists) {
        alert("game doesn't exist! try again or generate new game")
      } else {
        this.setState({ gameCodeSet: true })
      }
    });
    event.preventDefault();
    
  }

  makeCode = () => {
    let choices = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += choices.charAt(Math.floor(Math.random() * choices.length));
    }
    return code;
  }

  checkGameUnique = (code) => {
    let gameref = this.db.collection("currentGames").doc(code);
    return gameref.get().then((doc) => {
      if (!doc.exists) {
        // this.setState({ gameCodeSet: true, gameCode: code });
        console.log("within function: returning true")
        return true;
      }
    });
  }

  createGame = () => {
    let code = this.makeCode();
    this.checkGameUnique(code).then(unique => {
      if (unique) {
        let gameref = this.db.collection("currentGames").doc(code);
        gameref.set({currentQuestion: "",
                        currentAnswer: "",
                        buzzer: "closed"}
        ).then(() => {this.setState({ gameCode: code, gameCodeSet: true })})  
      } else {
        this.createGame()   // i know, might not be optimal. Getting around putting async func in loop
      }
    })
  }

  render () {
    if (!this.state.gameCodeSet) {
      return (
        <div>
          <h1>Enter Game Code or Start New Game</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Game Code:
              <input type="text" value={this.state.gameCode} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            {/* <button onClick={() => {this.setState({gameCodeSet: true})}}>Go</button> */}
          </form>
          <button onClick={() => this.createGame()}>Create New Game</button>
        </div>
      )
    }

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
      return(<App gameCode={this.state.gameCode} />)
    } else if (this.state.choice === "buzzer1") {
      return(<BuzzerScreen player="1" gameCode={this.state.gameCode} />)
    } else if (this.state.choice === "buzzer2") {
      return(<BuzzerScreen player="2" gameCode={this.state.gameCode} />)
    } else if (this.state.choice === "buzzer3") {
      return(<BuzzerScreen player="3" gameCode={this.state.gameCode} />)
    } else if (this.state.choice === "trebek") {
      return(<AnswerScreen gameCode={this.state.gameCode} />)
    }
  }
}

export default ScreenChoice;