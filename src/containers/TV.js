import React from 'react';
import TVList from '../components/TV/TVList';
import Navbar from '../components/Shared/Navbar/Navbar';
import Pagination from '../components/Shared/Pagination';
import Search from '../components/TV/Search';
import './TV.css'

class TVShows extends React.Component {     
    constructor() {    
        super()
        this.state = {
            baseURL: "http://image.tmdb.org/t/p/w185/",   
            TVShows: [],     
            watchlistIds: [],           
            watchedIds: [],           
            dislikeIds : [],           
            page: 1,
            totalPages: 0,
            backupTVShows: []
        }        
    }
    
    componentDidMount() { 
        this.setState({
            TVShows: [],   
            totalPages: 0
        });
        this.getTVShows();
        this.getWatchlist();
        this.getWatched();
        this.getDislike();
    }

    getTVShows = () => {        
        fetch(`https://safe-bayou-79396.herokuapp.com/${this.props.TypeShowList}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({                
              page: this.state.page
            })
        })
        .then(response => response.json())
            .then(show => {                                
                if (show.results && show.results.length > 0) {                    
                    this.setState({                        
                        TVShows: show.results,
                        totalPages: show.total_pages,
                        Oops: "",
                        backupTVShows: show.results
                    });
                } else {
                    if (show.status_code === 25) {
                        this.setState({                            
                            Oops: "Too many Api requests, please slow down. You're too fast!"
                        });
                    } else {
                        console.error('Broken', show);
                    }
                }
                
      })             
            .catch(err => { console.log(err) });
        
    }   
       
    prevPage = () => {      
        if (this.state.page > 1 && this.state.page <= this.state.totalPages)
        {
          this.setState({ page: this.state.page - 1 }, this.getTVShows);                
        }  
        else if (this.state.page > this.state.totalPages)
        {
          this.setState({ page: this.state.totalPages }, this.getTVShows);             
        }
        window.scrollTo(0, 0);
    }
    
    nextPage = () => {         
    
        if (this.state.page < this.state.totalPages)
        {
            this.setState({ page: this.state.page + 1 }, this.getTVShows);          
        }        
        else
        {
          this.setState({ page: this.state.totalPages }, this.getTVShows)          
        }  
        window.scrollTo(0, 0);
      }
    
    randomPage = () => {        
        this.setState({ page: Math.floor((Math.random() * this.state.totalPages) + 1) }, this.getTVShows);        
        window.scrollTo(0, 0);
    }   

    getWatchlist = () => {        
        return fetch('https://safe-bayou-79396.herokuapp.com/watchlistTV', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: sessionStorage.getItem("user")
          })
        })
          .then(response => response.json())
          .then(list => {
            if (list) {
                this.setState({ watchlistIds: list });               
                return list;
            }
          })
    } 

    getWatched = () => {        
        return fetch('https://safe-bayou-79396.herokuapp.com/watchedTV', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: sessionStorage.getItem("user")
          })
        })
          .then(response => response.json())
          .then(list => {
            if (list) {
                this.setState({ watchedIds: list });               
                return list;
            }
          })
    } 

    getDislike = () => {        
        return fetch('https://safe-bayou-79396.herokuapp.com/dislikeTV', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: sessionStorage.getItem("user")
          })
        })
          .then(response => response.json())
          .then(list => {
            if (list) {
                this.setState({ dislikeIds: list });               
                return list;
            }
          })
    } 
    onSearchChange = (event) => {   
        
        var search = event.target.value;    
        if (search.length < 1)
        {
            this.setState({TVShows: this.state.backupTVShows})
        }        
        else {
            fetch('https://safe-bayou-79396.herokuapp.com/searchTV', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    searchTVShows: search
                })
            })
                .then(response => response.json())
                .then(show => {
                    this.setState({ TVShows: show })
                })
                .catch(err => console.log(err))   
        }

        
    }

    render() {
        const { baseURL, TVShows, Oops } = this.state;
        return (
            <div>
                <Navbar></Navbar>                
                {                    
                    (TVShows.length > 0) ? 
                    <div className="tvContainer">
                            <h1>{this.props.heading}</h1>
                            {!sessionStorage.getItem("user") ? <div style={{ "background": "red", "color": "white"}}>Your are not signed in</div> : <div></div>}
                            <Search onSearchChange={this.onSearchChange}></Search>
                            <Pagination totalPages={this.state.totalPages} page={this.state.page} prevPage={this.prevPage} nextPage={this.nextPage} randomPage={this.randomPage}></Pagination>
                            {(Oops) ?                                
                                    <h3 style={{"color" : "red"}}>{Oops}</h3>                                
                                : <span></span>}
                            <TVList TVShows={TVShows} baseURL={baseURL} watchlistIds={this.state.watchlistIds} getWatchlist={this.getWatchlist} watchedIds={this.state.watchedIds} getWatched={this.getWatched} dislikeIds={this.state.dislikeIds} getDislike={this.getDislike} ></TVList>                
                        <Pagination totalPages={this.state.totalPages} page={this.state.page} prevPage={this.prevPage} nextPage={this.nextPage} randomPage={this.randomPage}></Pagination>
                    </div>
                    :<p className="tvContainer">Loading</p>
                }  
            </div>
        )    
    }
}   
export default TVShows;