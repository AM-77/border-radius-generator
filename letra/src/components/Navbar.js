import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    looking_for = () => {
        this.setState(state => ({
            looking_for: document.querySelector("input.search-input").value,
            searching: "found"
        }))
    }

    render() {
        return (
            <div>
                <input className="search-input" type="text" />
                <button onClick={this.looking_for}>search</button>
                <hr />
                {(this.state.searching === "found") ? <Redirect to={'/search/' + this.state.looking_for} /> : null}

            </div>
        )
    }
}
