import React from 'react';

const Logo = () => {
    return (
        <div>                    
            <header className="bg-white black-80 tc pv4 avenir">            
                <img className= "w5" src="https://images.unsplash.com/photo-1501421018470-faf26f6b1bef?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=de2f768321958e878703c793724d87fa&auto=format&fit=crop&w=1050&q=80" alt="Movies"/>            
                <h1 className="mt2 mb0 baskerville i fw1 f1">Movie and TV Show Tracker</h1>
                <h2 className="mt2 mb0 f6 fw4 ttu tracked">For your tracking needs</h2>           
            </header>
        </div>
    );
};

export default Logo;