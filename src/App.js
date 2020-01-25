import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard'
// import firebase from './Firebase'

class App extends Component {
  // const categories = ['Potent Potables', 'Letters That Begin With "G"',  'Who Reads', 'Let It Snow', 'State Your Name', 'Famous Oprahs']
  constructor(props) {
    super(props);

    this.state = {
      date: "",
      dates: []
    }
  }

  componentDidMount () {
    fetch("/dates", {method: 'GET'})
      .then(data => data.json())
      .then(json => this.setState({dates: json}))
  }

  render () {
    if (this.state.date === "") {
      return (
        <div>
          <p>please select date</p>
          {this.state.dates.map((date) => {
            return (
              <button onClick={() => {this.setState({date: date})}}>{date}</button>
            )
          })}
        </div>
      )
    } else {
      return (
        <GameBoard date={this.state.date}/>
      );
    }
    
  }
}

export default App;
