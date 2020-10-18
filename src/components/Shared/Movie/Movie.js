import React from 'react';

import './Movie.css';

import { router } from '../../../router.config';

const SAFE_BAYOU_SERVER = "https://safe-bayou-79396.herokuapp.com/";
const IMAGE_BASE_URL="http://image.tmdb.org/t/p/w185/";

class Movie extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            feedback: "",
            watchlistIds : this.props.watchlistIds,
            watchedIds: this.props.watchedIds,
            dislikeIds: this.props.dislikeIds,
            baseURL: IMAGE_BASE_URL
        }
    }

    displayModal = (cast) => {                        
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];       
        var content = document.getElementById('content');      
        content.innerHTML = "";       
        var title = document.getElementById('title');
        
        title.innerHTML = this.props.title;
        
        modal.style.display = "block";
        
        cast.forEach((c) => {
            if (c.profile_path != null) {
                var div = document.createElement("div");
                div.className = "cast";

                var pic = document.createElement("img");
                pic.setAttribute('src', this.state.baseURL + c.profile_path);
                pic.setAttribute('alt', 'na');
                pic.setAttribute('height', '200px');                            

                var name = document.createElement("p");
                var nameText = document.createTextNode(c.name);
                name.appendChild(nameText);

                div.appendChild(pic);
                div.appendChild(name);
                content.appendChild(div);    
            }
            
        })      

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }


    getCast = () => {        
        fetch(SAFE_BAYOU_SERVER + 'cast', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.props.id
          })
      })
        .then(response => response.json())
            .then(cast => {
                if (cast.cast.length > 1) {                                        
                    this.displayModal(cast.cast);
                }
                
        })          
        .catch(err => { console.log(err) });
    }

    getTrailers = () => {
        
        fetch(SAFE_BAYOU_SERVER + 'trailers', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.props.id
          })
      })
        .then(response => response.json())
            .then(trailers => {                
                if (trailers.results.length > 1) {
                    window.open("https://www.youtube.com/watch?v=" + trailers.results[0].key, "_blank");                
                }
                else {
                    alert("There's no trailers for this movie");
                }
                    

                
        })          
        .catch(err => { console.log(err) });
    }

    addToWatchlist = (event) => {
        if (sessionStorage.getItem("user")) {
            var mid = event.target.id;
            fetch(SAFE_BAYOU_SERVER + 'addwatchlist', {
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
            fetch(SAFE_BAYOU_SERVER + 'addwatched', {
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
            fetch(SAFE_BAYOU_SERVER + 'addDislike', {
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
    
        fetch(SAFE_BAYOU_SERVER + 'deletewatchlist', {
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
    
        fetch(SAFE_BAYOU_SERVER + 'deletewatched', {
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
    
        fetch(SAFE_BAYOU_SERVER + 'deleteDislike', {
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
            this.state.dislikeIds.forEach(w => {            
            
                if (Number(w.movieid) === Number(this.props.id))
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
    componentDidMount() {                
        this.addFeedback();       
        if (this.props.opt === "Movies") {
            var details = document.getElementById(`btn${this.props.id}toggleContent`);              
            details.classList.remove("hiddencontent");
            
            var img = document.getElementById(`btn${this.props.id}toggleImg`);       
            img.classList.toggle("dbhidden");
        }
    }
    componentWillReceiveProps() {                    
        this.addFeedback();
    }

    componentDidUpdate(prevProps, prevState) {  
        if (prevProps.id !== this.props.id) {
            this.addFeedback();
        }
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
    
    render() {
        
        const { id, title, poster_path, overview,
            vote_average, release_date,
            baseURL, genres, opt} = this.props;
        
        const { feedback } = this.state;
        console.log(opt);
        
            return (
                
                <section className="mw8 center avenir bg-light-gray">  
                    <article className="bt bb b--black-10">
        
                    { opt === "Movies" && sessionStorage.getItem("user") && feedback !== ""?
                            <div className={feedback}><span>{feedback}</span></div>:<span></span>
                    }       
                    
                        
                    <div className="db pv3 ph3 ph0-l no-underline black dim"></div>
                    <div className="flex flex-column flex-row-ns">
                        <div className="pr3-ns mb4 mb0-ns w-100 w-20-ns">
                        <img id= {"btn"+id+"toggleImg"} src={baseURL + poster_path} className="db dbhidden" alt="No movie poster available"/>
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
                        
                            <div id={"btn"+id+"toggleContent"} className = "hiddencontent">
                                    <p className="f6 lh-copy mv0">{"Rating: " + vote_average}</p>
                                    <p className="f6 f5-l lh-copy">
                                        {overview}
                                    </p>
                            
                                        <p className="f6 lh-copy mv0">{release_date}</p>

                                        <div className="cast_trailers">
                                            <a onClick={this.getCast}>Cast</a>
                                            <a className="tooltip" onClick={this.getTrailers}>Trailer
                                                <span class="tooltiptext">Enable pop-ups for this site to be able to view trailer</span>
                                            </a>
                                        </div>

                                        <div id="myModal" class="modal">
                                            <div class="modal-content">
                                                    <div class="modal-header">
                                                        <span class="close">&times;</span>
                                                    <h2 id="title"></h2>
                                                    </div>
                                                <div class="modal-body">
                                                    <div id="content"></div>                                               
                                                </div>        
                                            </div>
                                    </div>
                                    <br /> 
                            </div>
                                    
                                   
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
                            :
                                    <span>
                                        <button id={"btn" + id} onClick={this.showMore} className="togglecontentBTN f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Show more</button>                                    
                                        <button onClick={this.removeWatchlist} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Remove</button>
                                        <button onClick={this.addToWatched} id={id} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watched</button>
                                    </span>
                        }
                               
                        </div>
                    </div>    
                </article>
                </section>    
            );
    }
}



        
    
export default Movie;