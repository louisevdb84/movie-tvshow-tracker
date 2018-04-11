import React from 'react';
import './TV.css';
import Feedback from './Feedback';
import UserFeedbackControls from './UserFeedbackControls';

class TV extends React.Component {     
    
    componentDidMount() {  
        const { show } = this.props;
        this.fetchDetails(show);
    }
    componentDidUpdate(prevProps, prevState) {  
        const { id, show } = this.props;
        if (prevProps.id !== id) {
            this.fetchDetails(show);
        }
    }

    fetchDetails = (show)=>{
        return fetch(`https://safe-bayou-79396.herokuapp.com/detailsTV`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: show.id,
            })
        })      
            .then(response => response.json())
            .then(details => {                   
                if (details) { 
                    Object.assign(show, details);                  
                    this.setState({ TVShow: show });
                    return details;
                }                                                    
             })             
            .catch(err => { console.log(err) });              
    }

    render() {
        
        const { name, vote_average, poster_path,
            first_air_date, overview, baseURL, genres, show } = this.props;        
        return (            
            <section className="mw8 center avenir bg-light-gray">  
                <article className="bt bb b--black-10">    
                <Feedback></Feedback>
                <div className="db pv3 ph3 ph0-l no-underline black dim"></div>
                <div className="flex flex-column flex-row-ns">
                    <div className="pr3-ns mb4 mb0-ns w-100 w-20-ns">
                    <img src={baseURL + poster_path} className="db" alt="No TV Show poster available"/>
                    </div>
                    <div className="w-100 w-80-ns pl3-ns">
                            <h1 className="f3 fw1 baskerville mt0 lh-title">{name}</h1>   
                            {
                                (genres) ?
                                    genres.map((genre, i) => {
                                        return <strong><span key={i}>{genre.name + ", "}</span></strong>
                                    })
                                    :<span></span>
                                }    
                            <br />
                            <br />
                        <p className="f6 lh-copy mv0">{"Rating: " + vote_average}</p>
                            <p className="f6 f5-l lh-copy">{overview}</p>                          
                            <p className="f6 f5-l lh-copy">{show.type}</p>        
                        <p className="f6 lh-copy mv0">{first_air_date}</p>                            
                        <br />                                    
                        <UserFeedbackControls></UserFeedbackControls>        
                    </div>                        
                </div>                      
                </article>
            </section>    
        );
    }
}
export default TV;

