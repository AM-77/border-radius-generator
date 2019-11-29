import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { ReactComponent as Loupe } from "../loupe.svg";
export default class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    search_input_key_press = (e) => {
        let key = e.charCode || e.which || e.keyCode || 0
        if (key === 13)
            this.looking_for()
    }

    looking_for = () => {
        this.setState(state => ({
            looking_for: document.querySelector("input.search-input").value,
            searching: "found"
        }))
    }

    render() {
        return (
            <div className="nav-bar">
                <div className="logo">
                    <a href="/">
                        <img src={process.env.PUBLIC_URL + "/letra-logo.png"} alt="letra logo" />
                        <span>etra</span>
                    </a>
                </div>
                <div className="searching-form">
                    <input className="search-input" type="text" onKeyPress={this.search_input_key_press} />
                    <button onClick={this.looking_for}>
                        <Loupe />
                    </button>
                    {(this.state.searching === "found") ? <Redirect to={'/search/' + this.state.looking_for} /> : null}
                </div>
            </div>
        )
    }
}
