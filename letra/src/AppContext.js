import React, { Component, createContext } from 'react'

export const LetraContext = createContext()
class AppContext extends Component {
    render() {
        return (
            <LetraContext.Provider value={{
                base_url: "https://letra-server.herokuapp.com"
            }} >
                {this.props.children}
            </LetraContext.Provider>
        )
    }
}

export default AppContext
