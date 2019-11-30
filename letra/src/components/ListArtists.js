import React, { Component } from "react"
import Axios from "axios"
import { LetraContext } from "./../AppContext"
import Loader from "./Loader"
import { Link } from "react-router-dom"
import NotFound from "./NotFound"

class ListArtists extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            artists: []
        }
    }

    componentDidMount() {
        Axios.get(this.context.base_url + "/artists/" + this.props.match.params.artist)
            .then((res) => {
                this.setState(state => ({
                    loading: false,
                    artists: res.data.artists
                }))
            })
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState(state => ({ loading: true }))
        Axios.get(this.context.base_url + "/artists/" + newProps.match.params.artist)
            .then((res) => {
                this.setState(state => ({
                    loading: false,
                    artists: res.data.artists
                }))
            }).finally(() => {
                this.displayArtists()
            })
    }

    displayArtists = () =>
        !this.state.artists
            ?
            <NotFound />
            :
            (<div>
                <h1>Artists List for <span>{this.props.match.params.artist === 19 ? "#" : this.props.match.params.artist}</span> </h1>
                <div className="artists-list">
                    {
                        this.state.artists.map((artist, index) =>
                            <div key={index} className="artist-item">
                                <Link className="artist" to={artist.link}>{artist.name}</Link>
                            </div>)
                    }
                </div>
            </div>)



    render() {
        return (
            <div className="artists">
                {
                    this.state.loading ?
                        <div>
                            <h1>Loading Artists</h1>
                            <Loader />
                        </div>
                        :
                        this.displayArtists()
                }
            </div>
        )
    }
}

ListArtists.contextType = LetraContext
export default ListArtists