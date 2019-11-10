import React, { Component } from 'react';
import Album from '../../components/Album/Album';
import Pagination from '../../components/Pagination/Pagination';
import Categories from '../../components/Categories/Categories';
import Axios from 'axios';

class Albums extends Component {
    state = {
        albums: [],
        currentPage: 1,
        albumsPerPage: 8,
        category: "all"
    }

    componentDidMount(){
        this.fetchResults();
    }

    fetchResults = () => {
        if(this.state.category === "all") {
            Axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then((res) => {
                this.setState({
                    albums: res.data.feed.entry,
                    currentPage: 1
                });
            })
            .catch(err => console.log(err));
        } else {
            Axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then((res) => {
                const albums = res.data.feed.entry.filter((album) => {
                    return album.category.attributes.label.toLowerCase() === this.state.category
                });
                this.setState({
                    albums: albums,
                    currentPage: 1
                });
            })
        }  
    }

    paginate = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        });
    }

    handleCategory = (e) => {
        const category = e.target.value.toLowerCase();
        this.setState({
            category: category
        }, () => this.fetchResults());
    }

    render() {
        const { albums, currentPage, albumsPerPage, category } = this.state;
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
                    <Categories albums={albums} category={category} handleCategory={this.handleCategory} />
                    <Pagination albumsPerPage={albumsPerPage} totalAlbums={albums.length} paginate={this.paginate} />
                    <div className="row">
                        { albumList }
                    </div>
                </div>
            </section>
        )
    }
}

export default Albums;
