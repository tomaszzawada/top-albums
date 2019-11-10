import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <Link to='/'><span className="navbar-brand mb-0 h1">TopAlbums</span></Link>
        </nav>
    )
}

export default Nav;
