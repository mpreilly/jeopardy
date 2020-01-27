import React, { Component } from 'react';
import App from './App';
import BuzzerScreen from './components/BuzzerScreen';
import AnswerScreen from './components/AnswerScreen';
import firebase from './Firebase';
import { Box,
        Button,
        Form,
        FormField,
        Grommet,
        TextInput } from 'grommet';


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
    if (this.state.gameCode.length === 0) {
      alert("please enter a game code, or click \"Create New Game\"");
      event.preventDefault();
      return;
    }

    if (this.state.gameCode.length !== 4) {
      alert("All game codes are 4 characters long.\nPlease enter a valid game code, or click \"Create New Game\".");
      event.preventDefault();
      return;
    }

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
    const theme = {
      global: {
        colors: {
          jBlue: '#060CE9',
          jGold: '#FFCC00'
        },
        font: {
          family: 'Roboto',
          size: '14px',
          height: '20px',
        },
        focus: {
          border: {
            color: '#FFCC00'
          }
        },
      },
    };

    if (!this.state.gameCodeSet) {
      return (
        <Grommet theme={theme} full>
          <Box fill>
            {/* <Box pad="medium" alignSelf="center" animation="fadeIn" width="medium"> */}
            <Box  flex overflow={{ horizontal: 'hidden' }} align='center' justify='center'>
              <Box 
                width='medium'
                background='light-2'
                elevation='small'
                align='center'
                justify='center'
                border={{ color: 'jBlue', size: 'large' }}
                pad="medium"
                round="medium"
              >
                <h6>Enter Game Code or Start New Game</h6>
                <Form onSubmit={this.handleSubmit}>
                  {/* <label>
                    Game Code:
                    <input type="text" value={this.state.gameCode} onChange={this.handleChange} />
                  </label> */}
                  {/* <FormField name="gameCode" label="Game Code" /> */}
                  <Box direction="row" pad="medium" gap="xsmall">
                    <TextInput
                      placeholder="Game Code"
                      value={this.state.gameCode}
                      onChange={this.handleChange}
                    />
                    {this.state.gameCode.length === 4 ? <Button primary type="submit" label="Go" color='jGold'/> : <Button type="submit" label="Go" color='jGold'/>}
                    {/* <Button type="submit" label="Go" color='jGold'/> */}
                  </Box>
                  
                  {/* <input type="submit" value="Submit" /> */}
                  {/* <button onClick={() => {this.setState({gameCodeSet: true})}}>Go</button> */}
                </Form>
                <Box  >
                  {this.state.gameCode.length !== 4 ? <Button primary onClick={() => this.createGame()} label="Create New Game" color='jGold'/> : <Button onClick={() => this.createGame()} label="Create New Game" color='jGold'/> }
                  {/* <Button onClick={() => this.createGame()} label="Create New Game" color='jGold'/> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grommet>
      )
    }

    if (this.state.choice === "") {
      return (
        <Grommet theme={theme} full>
          <Box fill>
            {/* <Box pad="medium" alignSelf="center" animation="fadeIn" width="medium"> */}
            <Box  flex overflow={{ horizontal: 'hidden' }} align='center' justify='center'>
              <Box 
                width='medium'
                elevation='small'
                align='center'
                justify='center'
                border={{ color: 'jBlue', size: 'large' }}
                pad="medium"
                round="medium"
                gap="small"
              >
                <h4>Choose Screen</h4>
                <Button onClick={() => {this.setState({choice: "gameboard"})}} label="Game Board" color='jGold'/>
                <Box direction="row" gap="xsmall">
                  <Button onClick={() => {this.setState({choice: "buzzer1"})}} label="Player 1" color='jGold'/>
                  <Button onClick={() => {this.setState({choice: "buzzer2"})}} label="Player 2" color='jGold'/>
                  <Button onClick={() => {this.setState({choice: "buzzer3"})}} label="Player 3" color='jGold'/>
                </Box>
                <Button onClick={() => {this.setState({choice: "trebek"})}} label="Trebek" color='jGold'/>
              </Box>
            </Box>
          </Box>
        </Grommet>





        // <div>
        //   <h1>Choose Screen</h1>
        //   <button onClick={() => {this.setState({choice: "gameboard"})}}>Game Board</button>
        //   <button onClick={() => {this.setState({choice: "buzzer1"})}}>Player 1</button>
        //   <button onClick={() => {this.setState({choice: "buzzer2"})}}>Player 2</button>
        //   <button onClick={() => {this.setState({choice: "buzzer3"})}}>Player 3</button>
        //   <button onClick={() => {this.setState({choice: "trebek"})}}>Trebek</button>
        // </div>
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