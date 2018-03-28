import React from 'react';
import './Navbar.css';

import { UISref } from '@uirouter/react'

function signout() {
    sessionStorage.removeItem("user");
}

const Navbar = () => {
    return (
        <div className = "navbar">                               
        <header className="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
          <nav className="f6 fw6 ttu tracked">
            <UISref to="home" params={{ username: sessionStorage.getItem("user") }}><a className="link dim white dib mr3" href="" title="home">Home</a></UISref>
            <UISref to="movies"  params={{ username: sessionStorage.getItem("user") }}><a className="link dim white dib mr3" href="" title="movies">Movies</a></UISref>          
            <UISref to="watchlist" params={{ username: sessionStorage.getItem("user") }}><a className="link dim white dib mr3" href="" title="watchlist">Watchlist</a></UISref>  
            {!sessionStorage.getItem("user") ?
            <span className = "loginDetails">            
                <UISref to="login" params={{ username: sessionStorage.getItem("user") }}><a className="link dim white dib mr3" href="" title="watchlist">Sign In</a></UISref>
                <UISref to="register" params={{ username: sessionStorage.getItem("user") }}><a className="link dim white dib mr3" href="" title="watchlist">Register</a></UISref>          
            </span>     
            : <span className="loginDetails">
                            <p className="link white dib mr3" href="" title="watchlist">Signed in as {sessionStorage.getItem("user")}</p>
                            <a className="link dim white dib mr3" href="" onClick={signout} title="watchlist">Sign Out</a>            
            </span> 
    }            
        </nav>
      </header>
        </div>
    );
};

export default Navbar;







