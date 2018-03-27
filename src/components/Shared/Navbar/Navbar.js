import React from 'react';

const Navbar = () => {
    return (
        <div>                               
        <header className="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
          <nav className="f6 fw6 ttu tracked">
          <a className="link dim white dib mr3" href="" title="home">Home</a>    
          <a className="link dim white dib mr3" href="" title="movies">Movies</a>
          <a className="link dim white dib mr3" href="" title="tv-Shows">TV Shows</a>
          <a className="link dim white dib mr3" href="" title="watchlist">Watchlist</a>
          <a className="link dim white dib mr3" href="" title="done">Watched</a>
          <a className="link dim white dib" href="" title="done">Watch-Again</a>  
        </nav>
      </header>
        </div>
    );
};

export default Navbar;







