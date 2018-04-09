import React from 'react';
import TVList from '../components/TV/TVList';
import Navbar from '../components/Shared/Navbar/Navbar';

class TVPopular extends React.Component {     
    constructor() {    
        super()
        this.state = {
          baseURL: "http://image.tmdb.org/t/p/w185/",           
          TVShows: [],                          
          page: 1          
        }        
      }
    componentDidMount() {
        fetch('https://safe-bayou-79396.herokuapp.com/popularTV', {
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
                })
      })             
      .catch(err => { console.log(err) });
    }

    render() {       
        const { TVShows, baseURL } = this.state;                
        return (            
            <div>
                <Navbar></Navbar>
                if(TVShows.length > 0){
                    <TVList TVShows={TVShows} baseURL={baseURL}></TVList>
                }
                else {
                    <p>Loading</p>
                }                
            </div>
        )    
    }
}   
export default TVPopular;