import React from 'react';

import './Movie.css';

function addToWatchlist(event) {
    
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
             console.log(entry);                          
               if (entry.length > 0) {
                 alert("Successfully added");
                 document.location.reload();
               }
               else {
                   alert(entry);
               }
           }) 
}  
    
function removeWatchlist(event) {
    
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
             console.log(entry);                          
               
                 alert("Successfully deleted");
                 document.location.reload();
               
           }) 
    }  
 
    function addToWatched(event) {
        
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
                 console.log(entry);                          
                   if (entry.length > 0) {
                       alert("Successfully added");
                       removeWatchlist(mid);
                     document.location.reload();
                   }
                   else {
                       alert(entry);
                   }
               }) 
        }  

const Movie = ({id,title,poster_path,overview,
    original_language, vote_average, release_date,
    baseURL, genres, opt, watchlistIds,  watchedIds }) => {    
        
    var feedback = "";
    if (opt === "Movies" && sessionStorage.getItem("user"))
    {
        watchlistIds.forEach(w => {            
        
            if (Number(w.movieid) === Number(id))
            {
                feedback = "Watchlist";
            }                
        });
        watchedIds.forEach(w => {            
        
            if (Number(w.movieid) === Number(id))
            {
                feedback = "Watched";
            }                
        });
    }    
    
    
    return (
        
        <section className="mw8 center avenir bg-light-gray">  
            <article className="bt bb b--black-10">

            { opt === "Movies" && sessionStorage.getItem("user")?
                <div className = "feedback">{feedback}</div>:<span></span>
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
                                {feedback === "Watchlist" || feedback === "Watched" ? <span></span> : <button onClick={addToWatchlist} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Add to Watchlist</button>}
                                {feedback === "Watched" ? <button onClick={addToWatchlist} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watch Again</button> : <button onClick={addToWatched} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watched</button>}
                            </span>
                        :
                            <span><button onClick={removeWatchlist} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Remove</button>
                            <button onClick={addToWatched} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watched</button></span>
                    }
                       
                </div>
            </div>    
        </article>
        </section>    
    );
}

export default Movie;