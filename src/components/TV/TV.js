import React from 'react';
import './TV.css';
import Feedback from './Feedback';
import UserFeedbackControls from './UserFeedbackControls';

import { router } from '../../router.config';

class TV extends React.Component {     
    constructor(props) {
        super(props);
        this.state = {
            feedback: "",
            watchlistIds: this.props.watchlistIds,            
            watchedIds: this.props.watchedIds,            
            dislikeIds: this.props.dislikeIds,
            baseURL: "http://image.tmdb.org/t/p/w185/",
            season: '',
            seasons: []
        }
    }     

    componentWillMount() {  
        const { show } = this.props;
        this.fetchDetails(show);  
    }
    componentDidMount() {
        this.addFeedback();           
    }

    componentDidUpdate(prevProps, prevState) {  
        const { id, show } = this.props;
        if (prevProps.id !== id) {            
            this.fetchDetails(show);            
            this.addFeedback();                                    
        }
    }

    fetchDetails = (show)=>{
        return fetch(`https://safe-bayou-79396.herokuapp.com/detailsTV`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: show.id,
            })
        })      
            .then(response => response.json())
            .then(details => {                  
                if (details) { 
                    Object.assign(show, details);                  
                    this.setState({ TVShow: show }, this.seasonList);                    
                    return details;
                }                                                    
             })             
            .catch(err => { console.log(err) });              
    }


    addFeedback = () => {               
        if (sessionStorage.getItem("user"))
        {
            var found = false;   
            
            this.state.watchedIds.forEach(w => {                                            
                if (Number(w.tvid) === Number(this.props.id))
                {                    
                    this.setState({ feedback: "Watched" });                    
                    found = true;                    
                }                   
            });
            
            this.state.watchlistIds.forEach(w => {                                            
                if (Number(w.tvid) === Number(this.props.id))
                {                    
                    this.setState({ feedback: "Watchlist" });
                    this.setState({ season: w.season });
                    found = true;                    
                }                   
            });           


            this.state.dislikeIds.forEach(w => {                                            
                if (Number(w.tvid) === Number(this.props.id))
                {                    
                    this.setState({ feedback: "Dislike" });                    
                    found = true;                    
                }                   
            });
            
            if (!found) {
                this.setState({ feedback: "" });
            }
        }    
    }

    addToWatchlist = (event) => {        
        if (sessionStorage.getItem("user")) {
            var mid = event.target.id;
            fetch('https://safe-bayou-79396.herokuapp.com/addwatchlistTV', {
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
                        this.props.getWatchlist().then(list=>this.setState({watchlistIds:list}, this.addFeedback));
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
            this.removeWatchlist(event);
            fetch('https://safe-bayou-79396.herokuapp.com/addwatchedTV', {
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
                        this.props.getWatched().then(list=>this.setState({watchedIds:list}, this.addFeedback));
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
            fetch('https://safe-bayou-79396.herokuapp.com/addDislikeTV', {
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
                        this.props.getDislike().then(list=>this.setState({dislikeIds:list}, this.addFeedback));
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
    
        fetch('https://safe-bayou-79396.herokuapp.com/deletewatchlistTV', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: mid,
                username: sessionStorage.getItem("user")
            })
        })
            .then(response => response.json())
            .then(entry => {        
                this.props.getWatchlist().then(list=>this.setState({watchlistIds:list},this.addFeedback));
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
    
        fetch('https://safe-bayou-79396.herokuapp.com/deleteWatchedTV', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: mid,
                username: sessionStorage.getItem("user")
            })
        })
            .then(response => response.json())
            .then(entry => {        
                this.props.getWatched().then(list=>this.setState({watchedIds:list},this.addFeedback));
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
    
        fetch('https://safe-bayou-79396.herokuapp.com/deleteDislikeTV', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: mid,
                username: sessionStorage.getItem("user")
            })
        })
            .then(response => response.json())
            .then(entry => {        
                this.props.getDislike().then(list=>this.setState({dislikeIds:list},this.addFeedback));
            }) 
    }  

    seasonList() {       
        
        var s = [];
        for (var i = 0; i < this.props.show.number_of_seasons; i++){
            s.push(i + 1);            
        }                 
        this.setState({ seasons: s });    

        
    }

    updateSeason(event) {                
        var season = event.target.value;
        var id = event.target.id;  
        

        fetch('https://safe-bayou-79396.herokuapp.com/seasonupdate', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: sessionStorage.getItem("user"),
                id: id,
	            season: season
            })
        })
            .then(response => response.json())
            .then(season => {                
            })  
    }

    render() {                
        
        const { name, vote_average, poster_path,
            first_air_date, overview, baseURL, show } = this.props;        
        return (            
            <section className="mw8 center avenir bg-light-gray">  
                <article className="bt bb b--black-10">    
                <Feedback feedback={this.state.feedback}></Feedback>
                <div className="db pv3 ph3 ph0-l no-underline black dim"></div>
                <div className="flex flex-column flex-row-ns">
                    <div className="pr3-ns mb4 mb0-ns w-100 w-20-ns">
                    <img src={baseURL + poster_path} className="db" alt="No TV Show poster available"/>
                    </div>
                    <div className="w-100 w-80-ns pl3-ns">
                            <h1 className="f3 fw1 baskerville mt0 lh-title">{name}</h1>                               
                            {
                                (show.genres) ?
                                    show.genres.map((genre, i) => {
                                        return <strong><span key={i}>{genre.name + ", "}</span></strong>
                                    })
                                    :<span></span>
                                }    
                            <br />
                            <br />
                            <p className="f6 lh-copy mv0">{"Rating: " + vote_average}</p>
                            <p className="f6 f5-l lh-copy">Number of Seasons: {show.number_of_seasons}</p>  
                            {this.state.feedback==="Watchlist" && this.state.seasons.length>0?
                                <div>
                                    <label>Last Season Watched: </label>
                                    <select onChange={this.updateSeason} id={show.id} defaultValue={this.state.season}>
                                        <option value="0">None</option>
                                        {this.state.seasons.map(season => {                                            
                                            return <option value={season}>Season {season}</option>
                                        })}
                                    </select>
                                </div>
                                :<span></span>
                            }   
                            <p className="f6 f5-l lh-copy">{overview}</p>                                                 
                            <p className="f6 f5-l lh-copy"><strong>Status: {show.status}</strong></p>                
                            <p className="f6 lh-copy mv0">First Air Date: {first_air_date}</p>                            
                             <br />                                    
                            {
                                (this.state.feedback === "Watchlist") ?
                                    <span>    
                                        <button onClick={this.addToWatched} id={this.props.id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watched</button>    
                                        <button onClick={this.removeWatchlist} id={this.props.id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Remove from watchlist</button>                                        
                                    </span>
                                    : (this.state.feedback=== "Watched") ?
                                    <span>
                                        <button onClick={this.addToWatchlist} id={this.props.id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Watch Again?</button>                                           
                                        <button onClick={this.removeWatched} id={this.props.id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Remove watched</button>           
                                    </span>
                                    : (this.state.feedback === "Dislike") ?
                                    <span>                                        
                                        <button onClick={this.removeDislike} id={this.props.id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Remove dislike</button>            
                                    </span>
                                    :
                                    <span>
                                        <button onClick={this.addToWatchlist} id={this.props.id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Add to Watchlist</button>                       
                                        <button onClick={this.addToWatched} id={this.props.id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watched</button>            
                                        <button onClick={this.addToDislike} id={this.props.id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Dislike</button>        
                                    </span>        
                            }                         
                            
                            
                            
                    </div>                        
                </div>                      
                </article>
            </section>    
        );
    }
}
export default TV;

// Networks: { 
//     (show.networks) ?
//         show.networks.map((network, i) => {
//             return <span key={i}>{network.name + ", "}</span>
//         })
//         :<span></span>
//     } 

// <UserFeedbackControls id={this.props.id} getWatchlist={this.props.getWatchlist}></UserFeedbackControls>        