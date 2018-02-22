import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './index.css';
import 'tachyons';

import Home from './containers/Home';
import Navbar from './components/Shared/Navbar/Navbar';
import Watched from './containers/Watched';
import Watching from './containers/Watching';
import Wishlist from './containers/Wishlist';


ReactDOM.render(
    <Router>   
    <div>            
        <Navbar/>
        <Route exact path="/" component= {Home}/>
        <Route exact path="/watched" component= {Watched}/>
        <Route exact path="/watching" component= {Watching}/>
        <Route exact path="/wishlist" component= {Wishlist}/>        
    </div>
    </Router>        
    , document.getElementById('root'));
