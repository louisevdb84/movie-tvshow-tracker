import React from 'react';

import { UISref } from '@uirouter/react'

const Navbar = () => {
    return (
        <div>                               
        <header className="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
          <nav className="f6 fw6 ttu tracked">
            <UISref to="home" params={{ username: sessionStorage.getItem("user") }}><a className="link dim white dib mr3" href="" title="home">Home</a></UISref>
            <UISref to="movies"  params={{ username: sessionStorage.getItem("user") }}><a className="link dim white dib mr3" href="" title="movies">Movies</a></UISref>          
            <UISref to="watchlist" params={{ username: sessionStorage.getItem("user") }}><a className="link dim white dib mr3" href="" title="watchlist">Watchlist</a></UISref>          
        </nav>
      </header>
        </div>
    );
};

export default Navbar;







