import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from "react-router-dom"
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
            searching: true
        }))
    }

    displayAlphabets = () => {
        let alphabets = []
        for (let i = 0; i < 26; i++) {
            alphabets.push(<Link key={i} className="alpha" to={"/artists/" + (i + 10).toString(36)}>{(i + 10).toString(36).toUpperCase()}</Link>)
        }

        alphabets.push(<Link key={26} className="alpha" to="/artists/19">#</Link>)
        return alphabets
    }

    render() {
        return (
            <div className="nav-bar">
                <div className="logo">
                    <Link to="/">
                        <img src={process.env.PUBLIC_URL + "/letra-logo.svg"} alt="letra logo" />
                        <span>etra</span>
                    </Link>
                </div>
                <div className="alphabets">
                    {this.displayAlphabets()}
                </div>
                <div className="searching-form">
                    <input className="search-input" type="text" onKeyPress={this.search_input_key_press} placeholder="Artist, Album, track's title or Lyrics" />
                    <button onClick={this.looking_for}>
                        <Loupe />
                    </button>
                    {(this.state.searching) ? <Redirect to={'/search/' + this.state.looking_for} /> : null}
                </div>
            </div>
        )
    }
}
