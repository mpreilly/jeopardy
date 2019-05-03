import React from 'react';
import './App.css';
import GameBoard from './components/GameBoard'

function App() {
  const categories = ['Potent Potables', 'Letters That Begin With "G"',  'Who Reads', 'Let It Snow', 'State Your Name', 'Famous Oprahs']
  return (
    <GameBoard categories={categories}/>
  );
}

export default App;
