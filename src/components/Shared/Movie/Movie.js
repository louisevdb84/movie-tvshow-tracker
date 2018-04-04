import React from 'react';

import './Movie.css';

import { router } from '../../../router.config';

class Movie extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            feedback: "",
            watchlistIds : this.props.watchlistIds,
            watchedIds : this.props.watchedIds,
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
    
    addFeedback = () => {           
        if (this.props.opt === "Movies" && sessionStorage.getItem("user"))
        {
            var found = false;
           
            this.state.watchedIds.forEach(w => {                        
                if (Number(w.movieid) === Number(this.props.id))
                {
                    this.setState({ feedback: "Watched" }); 
                    found = true;                    
                }                  
            });   
            this.state.watchlistIds.forEach(w => {            
            
                if (Number(w.movieid) === Number(this.props.id))
                {
                    this.setState({ feedback: "Watchlist" });
                    found = true;                    
                }                   
            });
            if (!found) {
                this.setState({ feedback: "" });
            }
        }    
    }
    componentDidMount() {        
        this.addFeedback();
    }
    componentWillReceiveProps() {        
        this.addFeedback();
    }
    
    render() {
        
        const { id, title, poster_path, overview,
            vote_average, release_date,
            baseURL, genres, opt} = this.props;
        
        const { feedback } = this.state;
        
            return (
                
                <section className="mw8 center avenir bg-light-gray">  
                    <article className="bt bb b--black-10">
        
                    { opt === "Movies" && sessionStorage.getItem("user") && feedback !== ""?
                            <div className={feedback}><span>{feedback}</span></div>:<span></span>
                    }       
                    
                        
                    <div className="db pv3 ph3 ph0-l no-underline black dim"></div>
                    <div className="flex flex-column flex-row-ns">
                        <div className="pr3-ns mb4 mb0-ns w-100 w-20-ns">
                        <img src={baseURL + poster_path} className="db" alt="moviePoster"/>
                        </div>
                        <div className="w-100 w-80-ns pl3-ns">
                                <h1 className="f3 fw1 baskerville mt0 lh-title">{title}</h1>
                            {opt === "Movies" ? 
                                <h4>{
                                    genres.map((genre, i) => {
                                        return <span key={i}>{genre + ", "}</span>
                                    })
                                }</h4>
                                : <h4>{
                                    genres.map((genre, i) => {
                                        return <span key={i}>{genre.name + ", "}</span>
                                    })
                                        }</h4>
                            }
                        
                            <p className="f6 lh-copy mv0">{"Rating: " + vote_average}</p>
                            <p className="f6 f5-l lh-copy">
                                {overview}
                            </p>
                    
                            <p className="f6 lh-copy mv0">{release_date}</p>
                            <br />        
                            {opt === "Movies" ?
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
                                                :
                                                <span>
                                                    <button onClick={this.addToWatchlist} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Add to Watchlist</button>
                                                    <button onClick={this.addToWatched} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watched</button>
                                                </span>
                                        }                                    
                                </span>
                            :
                                <span><button onClick={this.removeWatchlist} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Remove</button>
                                <button onClick={this.addToWatched} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watched</button></span>
                        }
                               
                        </div>
                    </div>    
                </article>
                </section>    
            );
    }
}



        
    
export default Movie;