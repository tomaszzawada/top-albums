import React, { Component } from 'react';
import Album from '../../components/Album/Album';
import Axios from 'axios';

class Albums extends Component {
    state = {
        albums: []
    }

    componentDidMount(){
        Axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
        .then(res => {
            this.setState({
                albums: res.data.feed.entry
            });
        })
        .catch(err => console.log(err));
    }

    render() {
        const { albums } = this.state;
        const albumList = albums.length ? (
            albums.map(album => {
                return <Album
                    key={album.id.attributes["im:id"]}
                    title={album["im:name"].label}
                    artist={album["im:artist"].label}
                    image={album["im:image"][2].label}
                />
            })
        ) : (
            <div className="center">Loading</div>
        );

        return (
            <section className="albums">
                <div className="container my-5">
                    <div className="row">
                        { albumList }
                    </div>
                </div>
            </section>
        )
    }
}

export default Albums
