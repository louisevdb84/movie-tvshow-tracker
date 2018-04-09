import React from 'react';
import TV from './TV';


const TVList = ({ TVShows, baseURL }) => {         
    return(
        <div>            
            {
                TVShows.map((TVShow, i) => {                    
                    return <TV 
                        key={i}
                        id={TVShow.id}
                        name={TVShow.name}                        
                        vote_average={TVShow.vote_average}
                        poster_path={TVShow.poster_path}
                        first_air_date={TVShow.release_date}
                        overview={TVShow.overview}
                        baseURL={baseURL}                        
                        />
                })    
            }
        </div>
    )
}

export default TVList;