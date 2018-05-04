import React from 'react';
import './Options.css';

class Options extends React.Component {     

    render() {
        return (
            <div className="options">
                <div className = "optionsContainer">     
                <div className = "filter">                   
                
                <select id = "sorting" onChange={this.props.onSortingChange} className="dropdbox">
                    <option>Sorting</option>    
                    <option name="rating" value="rating">Rating</option>
                    <option name="date" value="date">Date</option>            
                </select>  
                
                <select id = "genre" onChange={this.props.onGenreChange} className="dropdbox">
                <option>Genre</option>                    
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

    