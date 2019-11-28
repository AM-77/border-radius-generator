import React, { Component, createContext } from 'react'

export const LetraContext = createContext()
class AppContext extends Component {
    render() {
        return (
            <LetraContext.Provider value={{
                base_url: "http://localhost:3300"
            }} >
                {this.props.children}
            </LetraContext.Provider>
        )
    }
}

export default AppContext
