import React from 'react';
import './Feedback.css';

import { router } from '../../router.config';

class Feedback extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            feedback: "Watchlist",
            watchlistIds : this.props.watchlistIds,
            watchedIds: this.props.watchedIds,
            dislikeIds: this.props.dislikeIds,
            baseURL: "http://image.tmdb.org/t/p/w185/"
        }
    }     
    
    addFeedback = () => {           
        if (this.props.opt === "Movies" && sessionStorage.getItem("user"))
        {
            var found = false;
           
            this.state.watchedIds.forEach(w => {                        
                if (Number(w.movieid) === Number(this.props.id))
                {
                    this.setState({ feedback: "Watched" }); 
                    found = true;                    
                }                  
            });   
            this.state.watchlistIds.forEach(w => {            
            
                if (Number(w.movieid) === Number(this.props.id))
                {
                    this.setState({ feedback: "Watchlist" });
                    found = true;                    
                }                   
            });
            this.state.dislikeIds.forEach(w => {            
            
                if (Number(w.movieid) === Number(this.props.id))
                {
                    this.setState({ feedback: "Dislike" });                    
                    found = true;                    
                }                   
            });
            if (!found) {
                this.setState({ feedback: "" });
            }
        }    
    }

    componentDidMount() {                
        this.addFeedback();        
    }
    componentWillReceiveProps() {                    
        this.addFeedback();
    }

    componentDidUpdate(prevProps, prevState) {  
        if (prevProps.id !== this.props.id) {
            this.addFeedback();
        }
      }
    
   
    
    
    
    render() {

        const { feedback } = this.state;
        
            return (
                
                <div className="mw8 center avenir bg-light-gray">  
                    { sessionStorage.getItem("user") && feedback !== ""?
                        <div className={feedback}><span>{feedback}</span></div>
                        : <span></span>
                    }   
                </div>    
            );
    }
}

export default Feedback;