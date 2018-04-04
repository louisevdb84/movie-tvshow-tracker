import React from 'react';

import { UISref } from '@uirouter/react';
import { router } from '../router.config';

class Register extends React.Component { 

  onSubmitSignIn = () => {
    fetch('https://safe-bayou-79396.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({                
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
      })
    })
      .then(response => response.json())
      .then(user => {        
        if (user) {          
          sessionStorage.setItem("user", user);
          router.stateService.go('upcoming', { username: user});          
        }
        else {
          document.querySelector('.form-control-feedback').innerHTML = user;  
        }
      })
  }

  render() {    
    return (
      <main class="pa4 black-80">
      <div class="measure center">
        <fieldset id="register" class="ba b--transparent ph0 mh0">
          <legend class="f4 fw6 ph0 mh0">Register</legend>
          <div class="mt3">
            <label class="db fw6 lh-copy f6" for="username">Username</label>
            <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username"  id="username" placeholder="Enter username" />
          </div>
          <div class="mv3">
            <label class="db fw6 lh-copy f6" for="password">Password</label>
            <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" placeholder="Password" />
            <div class="form-control-feedback"></div> 
          </div>
         
        </fieldset>
        <div class="">
          <button onClick={this.onSubmitSignIn} value="Register" className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit">Register</button>
        </div>
        <div class="lh-copy mt3">
          <UISref to="login"><a className="f6 link dim black db">Sign In</a></UISref>    
          <UISref to="home"><a className="f6 link dim black db">Home</a></UISref>      
        </div>
      </div>
    </main>
     
    );
  }
}

export default Register;