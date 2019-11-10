import React from 'react';

const Album = () => {
    return (
         <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="card my-3 justify-content-between">
                <img src="https://source.unsplash.com/random/200x150" className="card-img-top" alt=""/>
                <div className="text-center pb-3">
                    <h5 className="card-title">Album Title</h5>
                    <p className="card-text">Artist Name</p>
                </div>
            </div>          
        </div>
    )
}

export default Album;
