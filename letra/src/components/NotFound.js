import React, { Component } from 'react'

import { URLContext } from "./../App"

class NotFound extends Component {

    static contextType = URLContext
    render() {

        console.log(this.context)
        return (
            <div>
                <p>Not Found</p>
            </div>
        )
    }
}

export default NotFound