import React, { Component } from 'react'
import Axios from "axios"
import { Link } from "react-router-dom"
import { LetraContext } from '../AppContext'
import Loader from "./Loader"

class Lyrics extends Component {

    constructor(props) {
        super(props)
        this.state = {
            artist: this.props.match.params.artist,
            track: this.props.match.params.track,

            loading: true,
            artist_name: "",
            track_title: "",
            lyrics: []
        }
    }

    componentDidMount() {
        const base_url = this.context.base_url
        Axios.get(base_url + "/lyrics/" + this.state.artist + "/" + this.state.track).then((res) => {
            this.setState(state => ({
                artist_name: res.data.artist,
                track_title: res.data.title,
                lyrics: res.data.lyrics,
                loading: false
            }))
        })
    }

    displayLyrics() {
        return <div>
            {
                this.state.lyrics.map((line, index) => (
                    <p key={index}>
                        {
                            line.indexOf("[") >= 0 && line.indexOf("[?]") < 0
                                ? <b className="artist">{line.replace("[", "*** ").replace("]", " ***")}</b>
                                : line

                        }
                    </p>
                ))
            }
        </div>
    }

    render() {
        return (
            <div className="lyrics">
                {
                    this.state.loading ?
                        <div>
                            <h1>Loading Lyrics</h1>
                            <Loader />
                        </div>
                        :
                        <div>
                            <h1>
                                <Link to={"/artist/" + this.state.artist}>{this.state.artist_name}</Link> : {this.state.track_title} </h1>
                            {this.displayLyrics()}
                        </div>
                }
            </div>
        )
    }
}

Lyrics.contextType = LetraContext
export default Lyrics