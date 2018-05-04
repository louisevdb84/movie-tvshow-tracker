import React, { Component } from 'react';
import MovieList from '../components/Shared/MovieList/MovieList';

 import Options from "../components/Movies/Options/Options";
import Navbar from '../components/Shared/Navbar/Navbar';
import Pagination from '../components/Shared/Pagination';


class Movies extends Component {  
  constructor() {    
    super()
    this.state = {
      baseURL: "http://image.tmdb.org/t/p/w185/",      
      upcomingMovies: [],      
      genres: [],
      genreList: [],     
      watchlistIds: [],
      watchedIds: [],
      dislikeIds: [],
      backupMovies: [],      
      totalPages: 0,
      page: 1
    }        
  }


  componentDidMount() {     
    this.getPages();     
    this.getWatchlist(); 
    this.getWatched(); 
    this.getDislike();
    this.getMovies();
  }

  getPages = () => {
    fetch('https://safe-bayou-79396.herokuapp.com/countUpcoming')        
    .then(response => response.json())
      .then(count =>
      {
        this.setState({ totalPages: count })        
      })   
      .catch(err => { console.log(err) });
  }

  prevPage = () => {   
    
    this.getPages();

    if (this.state.page > 1 && this.state.page <= this.state.totalPages)
    {
      this.setState({ page: this.state.page - 1 });      
      this.getMovies();
    }  
    else if (this.state.page > this.state.totalPages)
    {
      this.setState({ page: this.state.totalPages }); 
      this.getMovies();
    }
    document.getElementById("search").value = "";
    document.getElementById("sorting").selectedIndex = 0;
    document.getElementById("genre").selectedIndex = 0;
    document.getElementById("pages").style.display = 'block';
    window.scrollTo(0, 0);
      
  }
  nextPage = () => {  
    
    this.getPages();

    if (this.state.page < this.state.totalPages)
    {
      this.setState({ page: this.state.page + 1 })
      this.getMovies();
    }        
    else
    {
      this.setState({ page: this.state.totalPages })
      this.getMovies();
    }  
    document.getElementById("search").value = "";
    document.getElementById("sorting").selectedIndex = 0;
    document.getElementById("genre").selectedIndex = 0;
    document.getElementById("pages").style.display = 'block';
    window.scrollTo(0, 0);
  }

  randomPage = () => {
    this.getPages();
    this.setState({ page:  Math.floor((Math.random() * this.state.totalPages) + 1) })
    this.getMovies();
    document.getElementById("search").value = "";
    document.getElementById("sorting").selectedIndex = 0;
    document.getElementById("genre").selectedIndex = 0;
    document.getElementById("pages").style.display = 'block';
    window.scrollTo(0, 0);
  }


  getMovies = () => {
    fetch('https://safe-bayou-79396.herokuapp.com/genres')
    .then(response => response.json())
      .then(genre => { 
        this.setState({genreList: genre.genres, genres: genre});
            fetch('https://safe-bayou-79396.herokuapp.com/upcomingMovies', {
                  method: 'post',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    page: this.state.page
                })
            })
            .then(response => response.json())
              .then(mov => {
              if(mov.length>0)
                this.setState({
                  upcomingMovies: this.addingGenres(mov, genre),                  
                  backupMovies: this.addingGenres(mov, genre),                  
                })
            })          
            .catch(err => { console.log(err) });
      })  
      .catch(err => { console.log(err) });
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
    }
    else if (event.target.value === "date") {
      this.sortDates(this.state.upcomingMovies);    
      this.setState({ upcomingMovies: this.state.upcomingMovies })      
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


  onSearchTextChange = (event)=> {   
    
    var search = event.target.value;    

    var page = document.getElementById("pages");
    if(page)
      page.style.display = 'none';
    if (search.length < 1)
    {
      this.setState({ upcomingMovies: this.state.backupMovies })
      
    }  
    else
    {
      fetch('https://safe-bayou-79396.herokuapp.com/search', {method:'post',  headers: {'Content-Type' : 'application/json'},body: JSON.stringify({searchMovies: search})})
      .then(response => response.json())
        .then(mov => {
          this.setState({
              upcomingMovies: this.addingGenres(mov, this.state.genres)          
          })
        })    
      .catch(err => console.log(err))
      }  
  }

  onGenreChange = (event => {        
    var movieGenres = [];
    
    this.state.backupMovies.forEach(m => {      
      if (Object.values(m.genre_ids).includes(Number(event.target.value))) {
        movieGenres.push(m);
      }      
    });
    if (movieGenres.length > 0)
    {
      this.setState({ upcomingMovies: movieGenres })      
    }        
    else
      alert("No movies on this page in that genre");
  })

  getWatchlist = () => {
    fetch('https://safe-bayou-79396.herokuapp.com/watchlist', {
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
        }
      })
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

  getDislike = () => {
    fetch('https://safe-bayou-79396.herokuapp.com/dislike', {
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
        }
      })
  }  
   
  render() {         
    const { baseURL, upcomingMovies, genreList, watchlistIds, watchedIds, dislikeIds } = this.state;
    
    return (        
      
        <div>      
        <Navbar></Navbar>
        <Options onOptionChange={this.onOptionChange}
              onSortingChange={this.onSortingChange}
              onSearchTextChange={this.onSearchTextChange}
              genreList = {genreList}
            onGenreChange={this.onGenreChange} />  
          <div className="tc"> 
            
          <h1 className="moviesheading">Upcoming Movies</h1>

          {!sessionStorage.getItem("user") ? <div style={{ "background": "red", "color": "white"}}>Your are not signed in</div> : <div></div>}
          {upcomingMovies.length > 0 ?
            <div>
              <Pagination totalPages={this.state.totalPages} page={this.state.page} prevPage={this.prevPage} nextPage={this.nextPage} randomPage={this.randomPage}></Pagination>
                <MovieList movies={upcomingMovies} baseURL={baseURL} opt="Movies" watchlistIds={watchlistIds} watchedIds={watchedIds} dislikeIds={dislikeIds}/>              
              <Pagination totalPages={this.state.totalPages} page={this.state.page} prevPage={this.prevPage} nextPage={this.nextPage} randomPage={this.randomPage}></Pagination>
              </div>  
              : <p>Loading</p>
              }
          </div>   
        </div>           
    );
  }
}

export default Movies;


