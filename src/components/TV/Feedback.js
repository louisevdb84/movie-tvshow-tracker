import React from 'react';
import './Feedback.css';

import { router } from '../../router.config';

class Feedback extends React.Component {     
   
    render() {
        
        const { feedback } = this.props;        
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