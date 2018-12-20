import React from 'react';

export default function SearchProduct(props) {
    return (
       
        <div className="d-flex justify-content-center h-100">
          <div className="searchbar">
            <input  className="search_input" type="text" aria-label="Search" name="Search" onChange={props.onSearch}></input>
            <div  class="search_icon"><i class="fas fa-search"></i></div>
          </div>
        </div>
        
        
     
       
     

    )
}

