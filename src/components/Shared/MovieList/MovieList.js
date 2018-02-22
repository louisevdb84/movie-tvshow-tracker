import React from 'react';
import Movie from '../Movie/Movie';

const MovieList = ({movies, baseURL}) => {       
    return(
        <div>
            {
                movies.map((movie, i) => {
                    return <Movie 
                        key={i} 
                        id = {movies[i].id}
                        title={movies[i].title} 
                        original_language={movies[i].original_language} 
                        vote_average={movies[i].vote_average} 
                        poster_path={movies[i].poster_path} 
                        release_date={movies[i].release_date} 
                        overview={movies[i].overview}  
                        baseURL={baseURL} 
                        />
                })    
            }
        </div>
    )
}

export default MovieList;