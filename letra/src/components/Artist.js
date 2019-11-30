import React, { Component } from 'react'
import Axios from "axios"
import { Link } from "react-router-dom"
import { LetraContext } from '../AppContext'
import Loader from "./Loader"
import NotFound from "./NotFound"

class Artist extends Component {

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
        const base_url = this.context.base_url
        Axios.get(base_url + "/artist/" + this.state.artist).then((res) => {
            this.setState(state => ({
                artist_name: res.data.artist,
                albums: res.data.albums,
                loading: false
            }))
        })
    }

    displayAlbums = () =>

        !this.state.albums
            ?
            <NotFound />
            :
            (<div>
                <h1>{this.state.artist_name}</h1>
                <div className="albums">
                    {
                        this.state.albums.length === 0
                            ?
                            <h4>Nothing Was Foud For This Artist</h4>
                            :
                            this.state.albums.map((album, index) => (
                                <div className="album" key={index}>

                                    {
                                        (album.title !== "other songs")
                                            ?
                                            <div>
                                                <h4>{album.title}<br />{album.year}</h4>
                                            </div>
                                            :
                                            <div>
                                                <h4>{album.title}</h4>
                                            </div>
                                    }
                                    <div>
                                        <ul>
                                            {
                                                album.tracks.map((track, index) => (
                                                    <li key={index}>
                                                        <Link to={track.link}>{track.title}</Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>)


    render() {
        return (
            <div className="artist">
                {
                    this.state.loading
                        ?
                        <div>
                            <h1>Loading The Artist's Page</h1>
                            <Loader />
                        </div>
                        :
                        this.displayAlbums()


                }
                <div className="clear"></div>
            </div>
        )
    }
}

Artist.contextType = LetraContext
export default Artist