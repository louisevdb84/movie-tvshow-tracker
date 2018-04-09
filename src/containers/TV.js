import React from 'react';
import TVList from '../components/TV/TVList';
import Navbar from '../components/Shared/Navbar/Navbar';
import Pagination from '../components/Shared/Pagination';
import './TV.css'

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
        this.getTVShows();
    }

    getTVShows = () => {        
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

    prevPage = () => {      
        if (this.state.page > 1 && this.state.page <= this.state.totalPages)
        {
          this.setState({ page: this.state.page - 1 }, this.getTVShows);                
        }  
        else if (this.state.page > this.state.totalPages)
        {
          this.setState({ page: this.state.totalPages }, this.getTVShows);             
        }
        window.scrollTo(0, 0);
    }
    
    nextPage = () => {         
    
        if (this.state.page < this.state.totalPages)
        {
            this.setState({ page: this.state.page + 1 }, this.getTVShows);          
        }        
        else
        {
          this.setState({ page: this.state.totalPages }, this.getTVShows)          
        }  
        window.scrollTo(0, 0);
      }
    
    randomPage = () => {        
        this.setState({ page: Math.floor((Math.random() * this.state.totalPages) + 1) }, this.getTVShows);        
        window.scrollTo(0, 0);
    }
    

    render() {               
        const { baseURL, TVShows } = this.state;        
        return (            
            <div>
                <Navbar></Navbar>                
                {(TVShows.length > 0) ?
                    <div className="tvContainer">
                        <h1>{this.props.heading}</h1>
                        <Pagination totalPages={this.state.totalPages} page={this.state.page} prevPage={this.prevPage} nextPage={this.nextPage} randomPage={this.randomPage}></Pagination>
                        <TVList TVShows={TVShows} baseURL={baseURL}></TVList>                
                        <Pagination totalPages={this.state.totalPages} page={this.state.page} prevPage={this.prevPage} nextPage={this.nextPage} randomPage={this.randomPage}></Pagination>
                    </div>
                    :<p className="tvContainer">Loading</p>
                }                
            </div>
        )    
    }
}   
export default TVShows;