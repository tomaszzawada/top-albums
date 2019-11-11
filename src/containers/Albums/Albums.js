import React, { Component } from 'react';
import Axios from 'axios';
import Album from '../../components/Album/Album';
import Pagination from '../../components/Pagination/Pagination';
import Categories from '../../components/Categories/Categories';
import Searchbar from '../../components/Searchbar/Searchbar';
import './Albums.scss';


class Albums extends Component {
    state = {
        albums: [],
        currentPage: 1,
        albumsPerPage: 8,
        category: "all",
        query: ""
    }

    componentDidMount(){
        this.fetchResults();
    }

    // fetchResults = () => {
    //     if(this.state.category === "all") {
    //         Axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
    //         .then((res) => {
    //             this.setState({
    //                 albums: res.data.feed.entry,
    //                 currentPage: 1
    //             });
    //         })
    //         .catch(err => console.log(err));
    //     } else {
    //         Axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
    //         .then((res) => {
    //             const albums = res.data.feed.entry.filter((album) => {
    //                 return album.category.attributes.label.toLowerCase() === this.state.category
    //             });
    //             this.setState({
    //                 albums: albums,
    //                 currentPage: 1
    //             });
    //         })
    //     }  
    // }

    fetchResults = () => {
        if(this.state.query === "" && this.state.category === "all") {
            Axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then((res) => {
                this.setState({
                    albums: res.data.feed.entry,
                    currentPage: 1
                });
            })
            .catch(err => console.log(err));
        } else if(this.state.query !== "" && this.state.category === "all"){
            Axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then((res) => {
                const albums = res.data.feed.entry.filter((album) => {
                    return album.title.label.toLowerCase().includes(this.state.query)
                });
                this.setState({
                    albums: albums,
                    currentPage: 1
                });
            })
        } else {
            Axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then((res) => {
                const albums = res.data.feed.entry.filter((album) => {
                    return album.title.label.toLowerCase().includes(this.state.query) && album.category.attributes.label.toLowerCase() === this.state.category
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

    handleSearch = (e) => {
        // e.preventDefault();
        const query = e.target.value.toLowerCase();
        // e.target.reset();
        this.setState({
            query: query
        }, () => this.fetchResults());
    }

    showAll = () => {
        this.setState({
            category: "all",
            query: ""
        },() => {this.fetchResults()});
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
            <div>
                <div className="no-albums center">No albums found</div>
            </div>
        );

        return (
            <section className="albums">
                <div className="container my-5">
                    <div className="row my-3">
                        <div className="col-md-2 my-1">
                            <button onClick={this.showAll} className="btn btn-outline-dark float-right">Reset filters</button>
                        </div>
                        <div className="col-md-5 my-1">
                            <Categories albums={albums} category={category} handleCategory={this.handleCategory} />
                        </div>
                        <div className="col-md-5 my-1">
                            <Searchbar handleSearch={this.handleSearch} />
                        </div>
                    </div>
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
