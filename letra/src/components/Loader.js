import React, { Component } from 'react'

export default class Loader extends Component {
    render() {
        return (
            <div>
                <div className="loading">
                    <div className="lds-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <img src={process.env.PUBLIC_URL + "/letra-logo.svg"} alt="letra logo" />
                    </div>
                </div>
            </div>
        )
    }
}
