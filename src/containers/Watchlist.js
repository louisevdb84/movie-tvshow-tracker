import React, { Component } from 'react';
import MovieList from '../components/Shared/MovieList/MovieList';
 
import Navbar from '../components/Shared/Navbar/Navbar';
import Login from './Login';


class Watchlist extends Component {  
  constructor() {    
    super()
    this.state = {     
      watchlist: [],     
      list: [],
      baseURL: "http://image.tmdb.org/t/p/w185/", 
      hasWatchlist: true, 
      watchedIds: []
      
    }        
  }

  
  
  display() {
    if (sessionStorage.getItem("user")) {
      fetch('https://safe-bayou-79396.herokuapp.com/watchlist', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: sessionStorage.getItem("user")
        })
      })
        .then(response => response.json())
        .then(list => {
          if (list.length > 0) {
            console.log(list);
            list.forEach(id => {
              this.setState({ hasWatchlist: true })
              fetch('https://safe-bayou-79396.herokuapp.com/id', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: id.movieid,
                  username: sessionStorage.getItem("user")
                })
              })
                .then(response => response.json())
                .then(entry => {
                  this.setState({ watchlist: entry });
                })
            })
          }
          else
          {
            this.setState({ hasWatchlist: false })
          }  
        })
    }
  }

  getWatched = () => {
    fetch('https://safe-bayou-79396.herokuapp.com/watched', {
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
        }
      })
  }  

  componentDidMount() {
    this.display();
    this.getWatched();
  }  
  
  render() {         
    if (sessionStorage.getItem("user")) {
      const { watchlist, list, baseURL, hasWatchlist } = this.state;    
        if (watchlist.id) {
          list.push(watchlist);  
        }    
        return (  
          <div>      
            <Navbar></Navbar>
            <br />
            <br />
            <br />
            <br />
            <div className="tc">      
            <h1>Movies Watchlist</h1>
            {!hasWatchlist ?
              <p>Nothing in watchlist</p>
              : hasWatchlist && list.length>0 ? <MovieList movies={list} baseURL={baseURL} watchedIds={this.state.watchedIds}/>            
              : hasWatchlist ? <p>Loading</p> : <span></span>}
            </div>      
            </div>        
      
        );  
    }
    else {
      return (<Login></Login>);
    }
    
  }
}

export default Watchlist;



// this.props.$stateParams.username === sessionStorage.getItem("user") ?

  

//  </div>   
//  :  <Login></Login> 


