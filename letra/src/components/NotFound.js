import React, { Component } from "react"
import { Link } from "react-router-dom"

class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <p>404</p>
                <h1>Page Not Found</h1>
                <Link to="/">Go Back To Home</Link>
            </div>
        )
    }
}

export default NotFound