import React from 'react';
import './TVWatch.css';
import Feedback from './Feedback';
import UserFeedbackControls from './UserFeedbackControls';

import { router } from '../../router.config';

class TVWatch extends React.Component {     
    constructor(props) {
        super(props);
        this.state = {      
            baseURL: "http://image.tmdb.org/t/p/w185/",
            seasons: []
        }
    }        
    componentWillMount() {
        this.seasonList();
        console.log("MOUNTED");
    }

    showMore(event) {        
        var details = document.getElementById(`${event.target.id}toggleContent`);  
        details.classList.toggle("hiddencontent");
        
        var img = document.getElementById(`${event.target.id}toggleImg`);       
        img.classList.toggle("dbhidden");

        var btn = document.getElementById(`${event.target.id}`);        
        if (btn.innerText === "Show more") {            
            btn.innerText = "Hide";
        }
        else {btn.innerText = "Show more"}
    }

    seasonList() {
        
        for (var i = 0; i < this.props.show.number_of_seasons; i++){
            this.state.seasons.push(i+1);
        }                    
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
        const { show } = this.props;                    
        return (            
            <section className="mw8 center avenir bg-light-gray">  
                <article className="bt bb b--black-10">                        
                <div className="pv1 no-underline black dim"></div>
                <div className="flex flex-column flex-row-ns">
                    <div className="poster">
                        <img id= {"btn"+show.id+"toggleImg"} src={this.state.baseURL + show.poster_path} className="db dbhidden" alt="No TV Show poster available"/>
                    </div>
                    <div className="w-100 w-80-ns pl3-ns">
                            <h1 className="f3 fw1 baskerville mt0 lh-title">{show.name}</h1>                               
                            {
                                (show.genres) ?
                                    show.genres.map((genre, i) => {
                                        return <strong><span key={i}>{genre.name + ", "}</span></strong>
                                    })
                                    :<span></span>
                                }    
                            <br />
                            <br />
                            <div id={"btn"+show.id+"toggleContent"} className = "hiddencontent">
                                <p className="f6 lh-copy mv0">{"Rating: " + show.vote_average}</p>
                                <p className="f6 f5-l lh-copy">Number of Seasons: {show.number_of_seasons}</p>  

                                <label>Last Season Watched: </label>                                
                                <select onChange={this.updateSeason} id={show.id} defaultValue={show.last_season_watched}>                            
                                    <option value="0">None</option>    
                                    {this.state.seasons.map(season => {
                                        return <option value={season}>Season {season}</option>
                                    })}
                                </select>

                                <p className="f6 f5-l lh-copy">{show.overview}</p>                                                 
                                <p className="f6 f5-l lh-copy"><strong>Status: {show.status}</strong></p>                
                                <p className="f6 lh-copy mv0">First Air Date: {show.first_air_date}</p>                            
                                <br />                                   
                            </div>   

                            <div className="togglecontent">
                                <button id={"btn"+show.id} onClick={this.showMore} className = "togglecontentBTN">Show more</button>
                            </div>
               
                    </div>                        
                </div>                      
                </article>
            </section>    
        );
    }
}
export default TVWatch;

//<button onClick={this.removeWatchlist} id={this.props.id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Remove from watchlist</button>