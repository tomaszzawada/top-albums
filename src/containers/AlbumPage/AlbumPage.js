import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import './AlbumPage.scss';

class AlbumPage extends Component {
    state = {
        album: []
    }

    componentDidMount(){        
        let id = this.props.match.params.album_id;
        Axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then((res) => {
                const albumData = res.data.feed.entry.filter((album) => {
                    return album.id.attributes["im:id"] === id
                });
                this.setState({
                    album: albumData
                });
                
            })
            .catch(err => console.log(err));
    }

    render() {
        const { album } = this.state;
        const albumDetails = album.length ? ( 
                <div className="card my-3">
                    <img src={album[0]["im:image"][2].label} className="card-img-top" alt=""/>
                    <h5 className="card-title">{album[0]["im:name"].label}</h5>
                    <p className="card-text">{album[0]["im:artist"].label}</p>
                </div>
        ) : (
            <div> No albums found </div>
        );
        return (
            <div className="container-fluid album-page">
                <h2 className="text-center py-5">Album Details</h2>                
                    { albumDetails }
                <Link to='/'>
                    <button className="btn btn-outline-dark">go back</button>
                </Link>
            </div>
        )
    } 
}

export default AlbumPage;
