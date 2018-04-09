import React from 'react';
import TV from './TV';

class TVTopRated extends React.Component {            
    render() {               
        return (    
            <div>                
                <TV TypeShowList = "topRatedTV" heading = "Top Rated TV Shows"></TV>                                        
            </div>    
        )    
    }
}   
export default TVTopRated;