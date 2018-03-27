import React, { Component } from 'react';
import MovieList from '../components/Shared/MovieList/MovieList';

 import Options from "../components/Movies/Options/Options";
import Navbar from '../components/Shared/Navbar/Navbar';


class Movies extends Component {  
  constructor() {    
    super()
    this.state = {
      baseURL: "http://image.tmdb.org/t/p/w185/",      
      upcomingMovies: [],
      topRated: [],
      popular: [],
      nowPlaying: [],      
      activeOption: [], 
      genres: [],
      genreList: [],     
      
    }        
  }


  componentDidMount() {    
    fetch('https://safe-bayou-79396.herokuapp.com/genres')
    .then(response => response.json())
      .then(genre => { 
        this.setState({genreList: genre.genres, genres: genre});
            fetch('https://safe-bayou-79396.herokuapp.com/upcomingMovies')
              .then(response => response.json())
              .then(mov => {
                this.setState({
                  upcomingMovies: this.addingGenres(mov, genre),
                  activeOption: this.addingGenres(mov, genre)
                })
              }); 
            
            fetch('https://safe-bayou-79396.herokuapp.com/topRated')
              .then(response => response.json())
              .then(mov => { this.setState({ topRated: this.addingGenres(mov, genre) })})    

            fetch('https://safe-bayou-79396.herokuapp.com/popular')
            .then(response => response.json())
              .then(mov => { this.setState({ popular: this.addingGenres(mov,genre) })})    

            fetch('https://safe-bayou-79396.herokuapp.com/nowPlaying')
              .then(response => response.json())
              .then(mov => { this.setState({ nowPlaying: this.addingGenres(mov,genre) }) })  
      

    })  
  }

  addingGenres = (mov, genre) => {
    mov.forEach(m => {                          
      m.genres = m.genre_ids.map(id => {                        
        id = genre.genres.find(g => {
          return (g.id === id);
        }).name;
        return id;
      })            
    });           
    return mov;
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
    
    fetch('https://safe-bayou-79396.herokuapp.com/search', {method:'post',  headers: {'Content-Type' : 'application/json'},body: JSON.stringify({searchMovies: search})})
    .then(response => response.json())
    .then(mov => { this.setState({ activeOption: this.addingGenres(mov, this.state.genres)})})    
    .catch(err => console.log(err))
    
  }

  onGenreChange = (event => {        
    var movieGenres = [];
    console.log(this.state.activeOption)
    this.state.activeOption.forEach(m => {      
      if (Object.values(m.genre_ids).includes(Number(event.target.value))) {
        movieGenres.push(m);
      }      
    });
    if (movieGenres.length > 0)
    {
      this.setState({ activeOption: movieGenres })      
    }        
    else
      alert("No movies in that genre");
  })
  
  render() {         
    const { activeOption, baseURL, upcomingMovies, genreList } = this.state;
    
    return (  
      // this.props.$stateParams.username === sessionStorage.getItem("user") ?
        <div className="tc">      
        <Navbar>  </Navbar>
          <Options onOptionChange={this.onOptionChange}
            onSortingChange={this.onSortingChange}
            onSearchTextChange={this.onSearchTextChange}
            genreList = {genreList}
            onGenreChange={this.onGenreChange} />  
          
          {activeOption.length > 0 ?
            <MovieList movies={activeOption} baseURL={baseURL} />
            : (upcomingMovies.length > 0) ?
            <MovieList movies={upcomingMovies} baseURL={baseURL} />
            : <p>Loading</p>
            }
        </div>   
        // :  <Login></Login> 
    );
  }
}

export default Movies;


