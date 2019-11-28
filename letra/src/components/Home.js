import React, { Component } from 'react'
import Axios from "axios"
import { Link } from "react-router-dom"
import { LetraContext } from '../AppContext'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hotalbums: [],
            hotsongs: [],
            loading: true
        }
    }

    componentDidMount() {
        const base_url = this.context.base_url
        Axios.get(base_url).then((res) => {
            this.setState(state => ({
                hotalbums: res.data.hotalbums,
                hotsongs: res.data.hotsongs,
                loading: false
            }))
        })
    }

    printAlbums = () => {
        return this.state.hotalbums.map((album, index) => (
            <div key={index}>
                <b>album:
                    <Link to={album.link}> <i>{album.album}</i></Link>
                </b>
                <br />
                <b>artist: <i>{album.artist}</i></b>
                <br />
                <img src={album.artwork} alt={album.album} />
                <hr />
            </div>
        ))
    }

    printSongs = () => {
        return this.state.hotsongs.map((song, index) => (
            <div key={index}>
                <b>artist: <a href={song.link}> <i>{song.artist}</i></a></b>
                <br />
                <b>title: <i>{song.title}</i></b>
                <hr />
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
                                <h1>Hot Albums</h1>
                                {this.printAlbums()}
                            </div>
                            <div>
                                <h1>Hot Songs</h1>
                                {this.printSongs()}
                            </div>
                        </div>
                }
            </div>
        )
    }
}

Home.contextType = LetraContext
export default Home