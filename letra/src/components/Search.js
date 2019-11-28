import React, { Component } from 'react'
import Axios from 'axios'



export default class Search extends Component {

    componentDidMount() {
        Axios.get("http://localhost:3300/search/" + this.props.match.params.looking_for)
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
