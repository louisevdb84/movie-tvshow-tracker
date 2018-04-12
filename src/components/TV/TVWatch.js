import React from 'react';
import './TVWatch.css';
import Feedback from './Feedback';
import UserFeedbackControls from './UserFeedbackControls';

import { router } from '../../router.config';

class TVWatch extends React.Component {     
    constructor(props) {
        super(props);
        this.state = {      
            baseURL: "http://image.tmdb.org/t/p/w185/"
        }
    }        
    
    // removeWatchlist = (event) => {
        
        
    //     var mid = "";
    //     try {
    //         mid = event.target.id;    
    //     }
    //     catch (err) {
    //         mid = event;
    //     }
    
    //     fetch('https://safe-bayou-79396.herokuapp.com/deletewatchlistTV', {
    //         method: 'post',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             id: mid,
    //             username: sessionStorage.getItem("user")
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(entry => {        
    //             this.props.getWatchlist().then(list=>this.setState({watchlistIds:list},this.addFeedback));
    //         }) 
    // }  

    showMore(event) {        
        var details = document.getElementById(`${event.target.id}toggleContent`);  
        details.classList.toggle("hiddencontent");
        
        var img = document.getElementById(`${event.target.id}toggleImg`);       
        img.classList.toggle("dbhidden");

        var btn = document.getElementById(event.target.id);
        console.log(btn.innerText);
        if (btn.innerText === "Show more") {            
            btn.innerText = "Hide";
        }
        else {btn.innerText = "Show more"}
    }

    render() {        
        const { show } = this.props;              
        return (            
            <section className="mw8 center avenir bg-light-gray">  
                <article className="bt bb b--black-10">                        
                <div className="pv1 no-underline black dim"></div>
                <div className="flex flex-column flex-row-ns">
                    <div className="poster">
                        <img id= {show.id+"toggleImg"} src={this.state.baseURL + show.poster_path} className="db dbhidden" alt="No TV Show poster available"/>
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
                            <div id={show.id+"toggleContent"} className = "hiddencontent">
                                <p className="f6 lh-copy mv0">{"Rating: " + show.vote_average}</p>
                                <p className="f6 f5-l lh-copy">Number of Seasons: {show.number_of_seasons}</p>  
                                <p className="f6 f5-l lh-copy">{show.overview}</p>                                                 
                                <p className="f6 f5-l lh-copy"><strong>Status: {show.status}</strong></p>                
                                <p className="f6 lh-copy mv0">First Air Date: {show.first_air_date}</p>                            
                                <br />                                   
                            </div>   

                            <div className="togglecontent">
                                <button id={show.id} onClick={this.showMore} className = "togglecontentBTN">Show more</button>
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