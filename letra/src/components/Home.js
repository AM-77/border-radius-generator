import React, { Component } from 'react'
import Axios from "axios"
import { Link } from "react-router-dom"
import { LetraContext } from '../AppContext'
import Loader from "./Loader"

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

    displayAlbums = () => {
        return <div>
            {
                this.state.hotalbums.map((album, index) => (
                    <div className="album single" key={index}>
                        <img className="artwork" src={album.artwork} alt={album.album} />
                        <div className="infos">
                            <p className="number"><span>#</span>{index + 1}</p>
                            <p className="artist"><Link to={album.link}>{album.artist}</Link></p>
                            <p className="title">{album.album}</p>
                        </div>
                    </div>
                ))
            }
            <div className="clear"></div>
        </div>
    }

    displaySongs = () => {
        return <div>
            {
                this.state.hotsongs.map((song, index) => (
                    <div className="song single" key={index}>
                        <div className="infos">
                            <p className="number"><span>#</span>{index + 1}</p>
                            <p className="artist"><Link to={song.artist_link}>{song.artist}</Link></p>
                            <p className="title"><Link to={song.title_link}>{song.title}</Link></p>
                        </div>
                    </div>
                ))
            }
            <div className="clear"></div>
        </div>
    }

    render() {
        return (
            <div className="home">
                {
                    this.state.loading ?
                        <div>
                            <div className="top10">
                                <h1>Top 10 Most Searched Songs</h1>
                                <Loader />
                            </div>
                            <div className="top10 albums">
                                <h1>Top 10 Most Searched Albums</h1>
                                <Loader />
                            </div>
                        </div>
                        :
                        <div>
                            <div className="top10">
                                <h1>Top 10 Most Searched Songs</h1>
                                {this.displaySongs()}
                            </div>
                            <div className="top10 albums">
                                <h1>Top 10 Most Searched Albums</h1>
                                {this.displayAlbums()}
                            </div>
                        </div>
                }
            </div>
        )
    }
}

Home.contextType = LetraContext
export default Home