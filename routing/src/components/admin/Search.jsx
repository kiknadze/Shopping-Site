import React from 'react';

export default function Search(props) {
    return (
        <div class="jumbotron jumbotron-fluid">
  <div class="container">
        <div className="input-group">
            <input type="text" className="form-control" aria-label="Search" name="Search" onChange={props.onSearch} />
            <div className="input-group-append">
                <span className="input-group-text" role="img" aria-label="Search"><i class="fas fa-search"></i></span>
            </div>
        </div>
        </div>
</div>
    )
}
