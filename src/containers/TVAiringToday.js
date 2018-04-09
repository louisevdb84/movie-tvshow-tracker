import React from 'react';
import TV from './TV';

class TVAiringToday extends React.Component {            
    render() {               
        return (    
            <div>                        
                <TV TypeShowList = "airingTodayTV" heading = "Airing today TV Shows"></TV>                                        
            </div>    
        )    
    }
}   
export default TVAiringToday;