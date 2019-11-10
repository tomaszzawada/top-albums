import React from 'react';

const Album = ({title, artist, image}) => {
    return (
         <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="card my-3 justify-content-between">
                <img src={image} className="card-img-top" alt=""/>
                <div className="text-center pb-3">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{artist}</p>
                </div>
            </div>          
        </div>
    )
}

export default Album;
