import React from 'react';

import { router } from '../../router.config';

class UserFeedbackControls extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = {
            feedback: "",
            watchlistIds : this.props.watchlistIds,
            watchedIds: this.props.watchedIds,
            dislikeIds: this.props.dislikeIds,
            baseURL: "http://image.tmdb.org/t/p/w185/"
        }
    }

    addToWatchlist = (event) => {
        if (sessionStorage.getItem("user")) {
            var mid = event.target.id;
            fetch('https://safe-bayou-79396.herokuapp.com/addwatchlist', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: mid,
                    username: sessionStorage.getItem("user")
                })
            })
                .then(response => response.json())
                .then(entry => {
                    if (entry.length > 0) {
                        this.state.watchlistIds.push({ movieid: entry });
                        this.addFeedback();
                    }
                    else {
                        alert(entry);
                    }
                })
        }
        else {
            router.stateService.go('login');
        }
    }    
       
        
    addToWatched = (event) => {        
        if (sessionStorage.getItem("user")) {
        var mid = event.target.id;
            fetch('https://safe-bayou-79396.herokuapp.com/addwatched', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: mid,
                    username: sessionStorage.getItem("user")
                })
            })
                .then(response => response.json())
                .then(entry => {
                    
                    if (entry.length > 0) {                           
                        this.state.watchedIds.push({ movieid: entry });                        
                        this.removeWatchlist(mid);
                        this.addFeedback();
                    }
                    else {
                        alert(entry);
                    }
                }) 
            }
            else {
                router.stateService.go('login');
            }
    }  
    
    addToDislike = (event) => {
        if (sessionStorage.getItem("user")) {
            var mid = event.target.id;
            fetch('https://safe-bayou-79396.herokuapp.com/addDislike', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: mid,
                    username: sessionStorage.getItem("user")
                })
            })
                .then(response => response.json())
                .then(entry => {
                    if (entry.length > 0) {
                        this.state.dislikeIds.push({ movieid: entry });
                        this.addFeedback();
                    }
                    else {
                        alert(entry);
                    }
                })
        }
        else {
            router.stateService.go('login');
        }
    }    

    removeWatchlist = (event) => {
        
        
        var mid = "";
        try {
            mid = event.target.id;    
        }
        catch (err) {
            mid = event;
        }
    
        fetch('https://safe-bayou-79396.herokuapp.com/deletewatchlist', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: mid,
                username: sessionStorage.getItem("user")
            })
        })
            .then(response => response.json())
            .then(entry => {        
              if(this.props.opt !== "Movies")
                    document.location.reload();  
              else {
                  for (var i = this.state.watchlistIds.length - 1; i >= 0; i--) {                    
                    if(Number(this.state.watchlistIds[i].movieid) === Number(entry.movieid)) {
                        this.state.watchlistIds.splice(i, 1);
                    }
                  }                  
                this.addFeedback();
                }
            }) 
    }  
    
    removeWatched = (event) => {
        
        
        var mid = "";
        try {
            mid = event.target.id;    
        }
        catch (err) {
            mid = event;
        }
    
        fetch('https://safe-bayou-79396.herokuapp.com/deletewatched', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: mid,
                username: sessionStorage.getItem("user")
            })
        })
            .then(response => response.json())
            .then(entry => {        
                if (this.props.opt !== "Movies")
                {
                    document.location.reload();          
                } 
                else {
                    for (var i = this.state.watchedIds.length - 1; i >= 0; i--) {                    
                        if(Number(this.state.watchedIds[i].movieid) === Number(entry.movieid)) {
                            this.state.watchedIds.splice(i, 1);
                        }
                      }                                         
                    this.addFeedback();
                }  
            }) 
    }  
    
    removeDislike = (event) => {
        
        
        var mid = "";
        try {
            mid = event.target.id;    
        }
        catch (err) {
            mid = event;
        }
    
        fetch('https://safe-bayou-79396.herokuapp.com/deleteDislike', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: mid,
                username: sessionStorage.getItem("user")
            })
        })
            .then(response => response.json())
            .then(entry => {        
              if(this.props.opt !== "Movies")
                    document.location.reload();  
              else {
                  for (var i = this.state.dislikeIds.length - 1; i >= 0; i--) {                    
                    if(Number(this.state.dislikeIds[i].movieid) === Number(entry.movieid)) {
                        this.state.dislikeIds.splice(i, 1);
                    }
                  }                  
                this.addFeedback();
                }
            }) 
    }  
    
    render() {

        var id = 123;
        var feedback = "Testing";
        
        return (
            <div>
            <span>
            {feedback === "Watchlist" ?
                <span>
                    <button onClick={this.addToWatched} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watched</button>
                    <button onClick={this.removeWatchlist} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Remove from watchlist</button>
                </span>
                : feedback === "Watched" ?
                    <span>
                        <button onClick={this.addToWatchlist} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watch Again</button>
                        <button onClick={this.removeWatched} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Remove from watched</button>    
                    </span>
                    
                : feedback === "Dislike" ?
                    <span>                                                    
                        <button onClick={this.removeDislike} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Remove dislike</button>    
                    </span>
                :
                <span>
                    <button onClick={this.addToWatchlist} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Add to Watchlist</button>
                    <button onClick={this.addToWatched} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watched</button>
                    <button onClick={this.addToDislike} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Dislike</button>        
                </span>    
            }                                    
            </span>    
            </div>
            );
    }
}

export default UserFeedbackControls;