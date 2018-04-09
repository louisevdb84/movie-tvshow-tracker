import React from 'react';
import TV from './TV';

class TVPopular extends React.Component {            
    render() {               
        return (    
            <div>                
                <TV TypeShowList = "popularTV" heading = "Popular TV Shows"></TV>                                        
            </div>    
        )    
    }
}   
export default TVPopular;