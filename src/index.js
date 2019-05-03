import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import BuzzerScreen from './components/BuzzerScreen';
import AnswerScreen from './components/AnswerScreen';


ReactDOM.render(
    <Router>
        <Route path="/" exact component={App}/>
        <Route path="/buzzer1" exact render={(props) => <BuzzerScreen {...props} player="1" />}/>
        <Route path="/buzzer2" exact render={(props) => <BuzzerScreen {...props} player="2" />}/>
        <Route path="/buzzer3" exact render={(props) => <BuzzerScreen {...props} player="3" />}/>
        <Route path="/trebek" exact component={AnswerScreen}/>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
