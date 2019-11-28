import React, { Component } from 'react'
import Axios from 'axios'
import { LetraContext } from "./../AppContext"

class Search extends Component {

    componentDidMount() {
        const base_url = this.context.base_url
        Axios.get(base_url + "/search/" + this.props.match.params.looking_for)
            .then((res) => {
                console.log(res.data)
            })
    }

    render() {
        return (
            <div>
                <p>This is the Search Component</p>
            </div>
        )
    }
}

Search.contextType = LetraContext
export default Search