import React from 'react';
import './Pagination.css';

const Pagination = ({totalPages, page, prevPage, nextPage,randomPage}) => {
    return (
        <div>    
            <div>Page {page} of {totalPages}</div>
            <div className="navButtons">
                <button onClick={prevPage}>Previous Page</button>
                <button onClick={nextPage}>Next Page</button>            
                <button onClick={randomPage}>Random Page</button>            
            </div>    
        </div>
    );
};

export default Pagination;