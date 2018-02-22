import React from 'react';

const Movie = ({id,title,poster_path,overview,
    original_language, vote_average, release_date, baseURL}) => {    
    return (
        <section className="mw8 center avenir bg-light-gray">  
        <article className="bt bb b--black-10">
            <div className="db pv3 ph3 ph0-l no-underline black dim"></div>
            <div className="flex flex-column flex-row-ns">
                <div className="pr3-ns mb4 mb0-ns w-100 w-20-ns">
                <img src={baseURL + poster_path} className="db" alt="moviePoster"/>
                </div>
                <div className="w-100 w-80-ns pl3-ns">
                        <h1 className="f3 fw1 baskerville mt0 lh-title">{title}</h1>
                        <p className="f6 lh-copy mv0">{vote_average}</p>
                <p className="f6 f5-l lh-copy">
                            {overview}
                        </p>
                
                        <p className="f6 lh-copy mv0">{release_date}</p>
                        <br/>        
                        <button className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple pointer">Add to Watchlist</button>   
                        <button className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Watched</button>           
                       
                </div>
            </div>    
        </article>
        </section>    
    );
}

export default Movie;