import React, { Component } from 'react';
import Album from '../../components/Album/Album';
import Pagination from '../../components/Pagination/Pagination';
import Axios from 'axios';

class Albums extends Component {
    state = {
        albums: [],
        currentPage: 1,
        albumsPerPage: 8
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

    paginate = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        });
    }

    render() {
        const { albums, currentPage, albumsPerPage } = this.state;
        const indexOfLastAlbum = currentPage * albumsPerPage;
        const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
        const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

        const albumList = currentAlbums.length ? (
            currentAlbums.map(album => {
                return <Album
                    key={album.id.attributes["im:id"]}
                    id={album.id.attributes["im:id"]}
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
                    <Pagination albumsPerPage={albumsPerPage} totalAlbums={albums.length} paginate={this.paginate} />
                    <div className="row">
                        { albumList }
                    </div>
                </div>
            </section>
        )
    }
}

export default Albums
