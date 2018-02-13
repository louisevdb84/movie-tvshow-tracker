import React, { Component } from 'react';

import Logo from "../components/Logo/Logo";

class Home extends Component {  
  render() {
    return (     
      <div className="bb tc mw7 center mt4">
        <Logo/>
        <h1 className="">This is home </h1>
      </div>
    );
  }
}

export default Home;
