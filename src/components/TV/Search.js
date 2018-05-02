import React from 'react';
import './Search.css'

class Search extends React.Component {  
    render() {              
        return (            
            <div className ='pa2'>
                <input 
                    id = 'searchText'
                    className='txtSearch' 
                    type="search" 
                    placeholder="Search TV Shows"/>
                <button className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer" onClick={this.props.onSearchChange}>Search</button>
             </div>  
        );
    }
}
export default Search;