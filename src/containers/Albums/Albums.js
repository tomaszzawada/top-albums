import React, { Component } from 'react';
import Album from '../../components/Album/Album';

class Albums extends Component {
    render() {
        return (
            <section className="albums">
                <div className="container my-5">
                    <div className="row">
                        <Album />
                        <Album />
                        <Album />
                        <Album />
                        <Album />
                        <Album />
                        <Album />
                        <Album />
                        <Album />
                        <Album />
                        <Album />
                        <Album />
                    </div>
                </div>
            </section>
        )
    }
}

export default Albums
