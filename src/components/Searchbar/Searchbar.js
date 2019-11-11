import React from 'react';
import './Searchbar.scss';

const Searchbar = (props) => {
    return (
        <form className="form-inline" autoComplete="off">
            <input className="form-control mr-sm-2" type="search"
            name="search" placeholder="Search" aria-label="Search" onKeyUp={props.handleSearch} />
        </form>
    )
}

export default Searchbar;