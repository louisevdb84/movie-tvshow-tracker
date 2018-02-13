import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './index.css';
import 'tachyons';

import Home from './containers/Home';
import Navbar from './components/Navbar/Navbar';
import Watched from './containers/Watched';
import Watching from './containers/Watching';
import Wishlist from './containers/Wishlist';


ReactDOM.render(
    <Router>   
    <div>            
        <Navbar/>
        <Route exact path="/movie-tvshow-tracker" component= {Home}/>
        <Route exact path="/movie-tvshow-tracker/watched" component= {Watched}/>
        <Route exact path="/movie-tvshow-tracker/watching" component= {Watching}/>
        <Route exact path="/movie-tvshow-tracker/wishlist" component= {Wishlist}/>

    </div>
    </Router>        
    , document.getElementById('root'));
