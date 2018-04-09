import React from 'react';
import TV from './TV';

class TVOnTheAir extends React.Component {            
    render() {               
        return (    
            <div>                
                <TV TypeShowList = "onTheAirTV" heading = "On the air TV Shows"></TV>                                        
            </div>    
        )    
    }
}   
export default TVOnTheAir;