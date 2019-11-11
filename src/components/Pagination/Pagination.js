import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({albumsPerPage, totalAlbums, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalAlbums / albumsPerPage) ; i++){
        pageNumbers.push(i);
    }

    return (
        <div className="row justify-content-center">
            <nav>
                <ul className="pagination flex-wrap">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <Link to='/' onClick={() => paginate(number)} className="page-link">
                                {number}
                            </Link>
                        </li>
                    ))}
                </ul>  
            </nav>
        </div>
    )
}

export default Pagination;
