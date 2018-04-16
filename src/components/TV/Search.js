import React from 'react';

class Search extends React.Component {  
    render() {              
        return (            
            <div className ='pa2'>
            <input 
                className='pa3 ba b--green bg-lightest-blue' 
                type="search" 
                placeholder="search TVshows"
                onChange = {this.props.onSearchChange}/>
             </div>  
        );
    }
}
export default Search;