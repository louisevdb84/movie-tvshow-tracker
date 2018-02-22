import React, { Component } from 'react';
import MovieList from '../components/Shared/MovieList/MovieList';

 import Options from "../components/Home/Options/Options";

class Home extends Component {  
  constructor(){
    super()
    this.state = {
      baseURL: "http://image.tmdb.org/t/p/w185/",      
      upcomingMovies: [],
      topRated: [],
      popular: [],
      nowPlaying: [],      
      activeOption: [],
    }    
}

componentDidMount(){
  fetch('http://localhost:3001/upcomingMovies')
    .then(response => response.json())
    .then(mov => { this.setState({ upcomingMovies: mov })})    
  
  fetch('http://localhost:3001/topRated')
    .then(response => response.json())
    .then(mov => { this.setState({ topRated: mov })})    

  fetch('http://localhost:3001/popular')
   .then(response => response.json())
    .then(mov => { this.setState({ popular: mov })})    

  fetch('http://localhost:3001/nowPlaying')
    .then(response => response.json())
    .then(mov => { this.setState({ nowPlaying: mov })})      
}

  onSortingChange = (event) => {      
    if (event.target.value === "rating") {
      
      this.sortRating(this.state.upcomingMovies);    
      this.setState({ upcomingMovies: this.state.upcomingMovies })
      
      this.sortRating(this.state.topRated);    
      this.setState({ topRated: this.state.topRated })
      
      this.sortRating(this.state.popular);    
      this.setState({ popular: this.state.popular })
      
      this.sortRating(this.state.nowPlaying);    
      this.setState({nowPlaying: this.state.nowPlaying})
      
    }
    else if (event.target.value === "date") {
      this.sortDates(this.state.upcomingMovies);    
      this.setState({ upcomingMovies: this.state.upcomingMovies })
      
      this.sortDates(this.state.topRated);    
      this.setState({ topRated: this.state.topRated })
      
      this.sortDates(this.state.popular);    
      this.setState({ popular: this.state.popular })
      
      this.sortDates(this.state.nowPlaying);    
      this.setState({nowPlaying: this.state.nowPlaying})
    }
  }

    sortRating = function (arrays) {      
      arrays.sort(function (a, b) {        
        return b.vote_average - a.vote_average;
      });
    }
    sortDates = function (arrays) {      
      arrays.sort(function (a, b) {
        return new Date(b.release_date) - new Date(a.release_date);
      });
    }
  
  onOptionChange = (event) => {
    switch (event.target.id) {
      case 'upcoming':
        this.setState({activeOption: this.state.upcomingMovies})
        break;
      case ('topRated'):
        this.setState({ activeOption: this.state.topRated });
        break;  
      case ('popular'):
        this.setState({ activeOption: this.state.popular });
        break;  
      case ('nowPlaying'):
        this.setState({ activeOption: this.state.nowPlaying });
        break;       
      default:
        break;  
    }
    
  }  

  onSearchTextChange = (event)=> {   
    
    var search = event.target.value;
    
    fetch('http://localhost:3001/search', {method:'post',  headers: {'Content-Type' : 'application/json'},body: JSON.stringify({searchMovies: search})})
    .then(response => response.json())
    .then(mov => { this.setState({ activeOption: mov }) })    
    .catch(err => console.log(err))
    
  }
  
  render() {   
    const { baseURL, activeOption, upcomingMovies } = this.state;      
   console.log(this.state.searchSuggestions)
    return (     
      <div className="tc">
        <Options onOptionChange={this.onOptionChange}
          onSortingChange={this.onSortingChange}
          onSearchTextChange={this.onSearchTextChange}/>          
        
        {activeOption.length > 0 ?
          <MovieList movies={activeOption} baseURL={baseURL} />
          : (upcomingMovies.length > 0) ?
          <MovieList movies={upcomingMovies} baseURL={baseURL} />
          : <p>Loading</p>
          }
      </div>   
    );
  }
}

export default Home;


