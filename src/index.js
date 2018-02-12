import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter as Router, Route} from "react-router-dom";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import 'tachyons';
import App from './containers/App';
import Navbar from './components/Navbar/Navbar';


ReactDOM.render(
    <Router>   
    <div>    
        <Navbar/>
        <Route exact path="/" component= {App}/>
        <Route exact path="/about" component= {Navbar}/>
        <Route exact path="/Shop" component= {Navbar}/>
    </div>
    </Router>        
    , document.getElementById('root'));
