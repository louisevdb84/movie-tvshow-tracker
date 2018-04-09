import React from 'react';
import TVList from '../components/TV/TVList';
import Navbar from '../components/Shared/Navbar/Navbar';

class TVShows extends React.Component {     
    constructor() {    
        super()
        this.state = {
            baseURL: "http://image.tmdb.org/t/p/w185/",   
            TVShows: [],                          
            page: 1,
            totalPages : 0  
        }        
      }
    componentDidMount() { 
        this.setState({ TVShows: [] });
        fetch(`https://safe-bayou-79396.herokuapp.com/${this.props.TypeShowList}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              page: this.state.page
            })
        })
        .then(response => response.json())
            .then(show => {                
                if(show.results.length>0)
                this.setState({
                    TVShows: show.results,   
                    totalPages: show.total_pages
                })
      })             
      .catch(err => { console.log(err) });
    }

    render() {               
        const { baseURL, TVShows} = this.state;
        return (            
            <div>
                <Navbar></Navbar>
                {(TVShows.length > 0)?
                    <TVList TVShows={TVShows} baseURL={baseURL}></TVList>                
                    :<p>Loading</p>
                }                
            </div>
        )    
    }
}   
export default TVShows;