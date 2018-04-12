import React, { Component } from 'react';
 
import Navbar from '../components/Shared/Navbar/Navbar';
import Login from './Login';
import TVWatch from '../components/TV/TVWatch';


class TVWatchlist extends Component {  
  constructor() {    
    super()
    this.state = {     
      watchlist: [],     
      list: [],
      baseURL: "http://image.tmdb.org/t/p/w185/", 
      hasWatchlist: true, 
    }        
  }  
  
  display() {
    if (sessionStorage.getItem("user")) {
      fetch('https://safe-bayou-79396.herokuapp.com/watchlistTV', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: sessionStorage.getItem("user")
        })
      })
        .then(response => response.json())
        .then(list => {          
          if (list.length > 0) {                        
            list.forEach(id => {              
              this.setState({ hasWatchlist: true })
              fetch('https://safe-bayou-79396.herokuapp.com/detailsTV', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: id.tvid,
                  username: sessionStorage.getItem("user")
                })
              })
                .then(response => response.json())
                .then(entry => { 
                  entry.last_season_watched = id.season;                  
                  this.setState({watchlist: entry});
                  
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

  componentDidMount() {
    this.display();    
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
            <h1>TV Shows Watchlist</h1>
            {!hasWatchlist ?
              <p>Nothing in watchlist</p>
                : hasWatchlist && list.length > 0 ?
                  
                  <div>
                    {
                      list.map(item => {                        
                        return <TVWatch show={item}></TVWatch>
                      })
                    }                    
                  </div>

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

export default TVWatchlist;

