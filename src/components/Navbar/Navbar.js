import React from 'react';

const Navbar = () => {
    return (
        <div>                               
            <nav className="bt bb tc mw7 center mt4">
                <a className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" href="/movie-tvshow-tracker">Home</a>
                <a className="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" href="/movie-tvshow-tracker/watching">Watching</a>
                <a className="f6 f5-l link bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l" href="/movie-tvshow-tracker/wishlist">Wishlist</a>
                <a className="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" href="/movie-tvshow-tracker/watched">Watched</a>                
            </nav>            
        </div>
    );
};

export default Navbar;







