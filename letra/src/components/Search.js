import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from "react-router-dom";
import { LetraContext } from "./../AppContext"
import Loader from "./Loader"

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            result: null
        }
    }

    componentDidMount() {
        Axios.get(this.context.base_url + "/search/" + this.props.match.params.looking_for)
            .then((res) => {
                this.setState(state => ({
                    loading: false,
                    result: res.data
                }))
            })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.looking_for !== prevProps.match.params.looking_for) {
            this.setState(state => ({ loading: true }))
            Axios.get(this.context.base_url + "/search/" + this.props.match.params.looking_for)
                .then((res) => {
                    this.setState(state => ({
                        loading: false,
                        result: res.data
                    }))
                }).finally(() => {
                    this.displayResult()
                })
        }
    }

    displayResult = () => {
        return <div className="results">
            <div className="result tracks">
                {
                    this.state.result.tracks.length === 0
                        ?
                        <h4>No track was found</h4>
                        :
                        <div>
                            <h4>{this.state.result.tracks.length} tracks was found</h4>
                            {
                                this.state.result.tracks.map((track, index) => {
                                    return <div className="track" key={index}>
                                        <div className="infos">
                                            <p>
                                                <Link to={track.title_link}><span className="title">{track.title}</span></Link> by <Link to={track.artist_link}><span className="title">{track.artist}</span></Link>
                                            </p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                }
            </div>
            <div className="result artists">
                {
                    this.state.result.artists.length === 0
                        ?
                        <h4>No artist was found</h4>
                        :
                        <div>
                            <h4>{this.state.result.artists.length} artists was found</h4>
                            {
                                this.state.result.artists.map((artist, index) => {
                                    return <div className="artist" key={index}>
                                        <div className="infos">
                                            <p>
                                                <Link to={artist.link}><span className="title">{artist.name}</span></Link>
                                            </p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                }
            </div>
            <div className="result albums">
                {
                    this.state.result.albums.length === 0
                        ?
                        <h4>No album was found</h4>
                        :
                        <div>
                            <h4>{this.state.result.albums.length} albums was found</h4>
                            {
                                this.state.result.albums.map((album, index) => {
                                    return <div className="album" key={index}>
                                        <div className="infos">
                                            <p>
                                                <Link to={album.link + "#" + album.album.replace(new RegExp(/ /g), "").toLowerCase()}><span className="title">{album.album}</span></Link> by <Link to={album.link}><span className="title">{album.artist}</span></Link>
                                            </p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                }
            </div>
        </div>
    }

    render() {
        return (
            <div className="search">
                <h1>Searching for: <span>{this.props.match.params.looking_for}</span></h1>
                {
                    this.state.loading
                        ?
                        <div className="results">
                            <div className="result tracks">
                                <h4>Searching tracks</h4>
                                <Loader />
                            </div>
                            <div className="result artists">
                                <h4>Searching artists</h4>
                                <Loader />
                            </div>
                            <div className="result albums">
                                <h4>Searching albums</h4>
                                <Loader />
                            </div>
                        </div>
                        :
                        this.displayResult()
                }
                <div className="clear"></div>
            </div>
        )
    }
}

Search.contextType = LetraContext
export default Search