import React, {Component} from 'react';
import Axios from 'axios';

class Categories extends Component {
    state = {
        categories: []
    }

    componentDidMount() {
        Axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then((res) => {
                const allCategories = res.data.feed.entry.map((album) => {
                    return album.category.attributes.label.toLowerCase();
                });
                const uniqueCategories = [...new Set(allCategories)]
                this.setState({
                    categories: uniqueCategories
                });
            })
            .catch(err => console.log(err));
    }

    render(){
        return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Categories</label>
                </div>
                <select value={this.props.category} onChange={this.props.handleCategory} className="custom-select" id="inputGroupSelect01">
                    <option value="All">All</option>
                    {this.state.categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
        )
    }
}

export default Categories;