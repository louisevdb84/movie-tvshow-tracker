import React from 'react';
import './Options.css';

class Options extends React.Component {     

    render() {
        return (
            <div className="options">
                <div className = "optionsContainer">     
                <div className = "filter">                   
                
                <select onChange={this.props.onSortingChange} className="dropdbox">
                    <option>Sorting options</option>    
                    <option name="rating" value="rating">Sort Rating</option>
                    <option name="date" value="date">Sort Date</option>            
                </select>  
                
                <select onChange={this.props.onGenreChange} className="dropdbox">
                <option>Genre options</option>                    
                    {   
                            this.props.genreList.map((g, i) => {                                                    
                            return <option key={i} value={g.id}>{g.name}</option>                
                        })
                    }                              
                    
                </select>  
            
                </div>                   
                    <div className = "search">
                        <input className="txtSearch" placeholder="Search Movies" onChange = {this.props.onSearchTextChange} type="text" id="search" />                    
                    </div>
                </div>    
        </div>     
        );
    }
}    

export default Options;

    