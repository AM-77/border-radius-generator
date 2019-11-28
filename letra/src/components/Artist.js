import React, { Component } from 'react'
import Axios from "axios"

import { Link } from "react-router-dom"

export default class Artist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            artist: this.props.match.params.artist,
            loading: true,
            artist_name: "",
            albums: []
        }
    }

    componentDidMount() {
        Axios.get("http://localhost:3300/artist/" + this.state.artist).then((res) => {
            this.setState(state => ({
                artist_name: res.data.artist,
                albums: res.data.albums,
                loading: false
            }))
        })
    }

    displayAlbums() {
        return this.state.albums.map((album, index) => (
            <div key={index}>

                {
                    (album.title !== "other songs") ?
                        <div>
                            <h3>title: <i>{album.title}</i></h3>
                            <h5>year: <i>{album.year}</i></h5>
                        </div>
                        : <div><h4><i>{album.title}</i> : </h4></div>}
                <div>
                    <ul>
                        {album.tracks.map((track, index) => (
                            <li key={index}>
                                <Link to={track.link}>
                                    <h5>{track.title}</h5>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        ))
    }

    render() {
        return (
            <div>
                {
                    this.state.loading ?
                        <div className="loading">
                            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                        :
                        <div>
                            <div>
                                <h1>{this.state.artist_name}</h1>
                                {this.displayAlbums()}
                            </div>
                        </div>
                }
            </div>
        )
    }
}
