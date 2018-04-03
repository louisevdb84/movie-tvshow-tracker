import React from 'react';
import './Options.css';

class Options extends React.Component {     

    render() {
        return (
            <div className="dt dt--fixed nav">
           <div className = "filter dtc tc bg-black-10">                    
          
        <select onChange={this.props.onSortingChange} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">
            <option>Sorting options</option>    
            <option name="rating" value="rating">Sort Rating</option>
            <option name="date" value="date">Sort Date</option>            
        </select>  
        
        <select onChange={this.props.onGenreChange} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">
        <option>Genre options</option>                    
            {   
                    this.props.genreList.map((g, i) => {                                                    
                    return <option key={i} value={g.id}>{g.name}</option>                
                })
            }                               
            
        </select>  
          
            </div>    
                <div className="options dtc tc bg-black-10">                    
                    
                    
                    <button id = 'nowPlaying' onClick = {this.props.onOptionChange} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue pointer">Now Playing</button>                    
                </div>
        
                <div className = "search dtc tc bg-black-10">
                    <input className="f6 br-pill ph3 pv2 mb2 bg-white cursor" placeholder="Search Movies" onChange = {this.props.onSearchTextChange} type="text" id="search" />                    
                </div>
            </div>    
        );
    }
}    

export default Options;

    