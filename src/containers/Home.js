import React from 'react';
import './Home.css';
import { UISref } from '@uirouter/react';

class Home extends React.Component { 
 
  render() {
    return (
      <div className="homePage">     
     
            <div className="homePageImage">
            <div className = "loginRegister">
              <UISref to="login"><button className = "f8 grow no-underline ph3 pv2 mb2 dib white bg-black pointer">Login</button></UISref>
              <UISref to="register"><button className="f8 grow no-underline ph3 pv2 mb2 dib white bg-black pointer">Register</button></UISref>
          </div>  
            </div>      
            <div className="homePageHeading">
          <h1>Movie and TV-Show Tracker</h1>
          <div>
              <UISref to="movies" params={{ username: "" }}><button className = "f8 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Continue</button></UISref>  
          </div>  
        
            
          
      
        </div>        
    </div>
    )
  }
}  

export default Home;