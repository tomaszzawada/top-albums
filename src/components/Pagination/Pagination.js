import React from 'react';

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
                            <a onClick={() => paginate(number)} href="/#" className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>  
            </nav>
        </div>
    )
}

export default Pagination;
