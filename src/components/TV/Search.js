import React from 'react';
import './Search.css'

class Search extends React.Component {  
    render() {              
        return (            
            <div className ='pa2'>
            <input 
                className='txtSearch' 
                type="search" 
                placeholder="search TVshows"
                onChange = {this.props.onSearchChange}/>
             </div>  
        );
    }
}
export default Search;