import React, { Component, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./components/Home"
import Lyrics from "./components/Lyrics"
import Artist from "./components/Artist"
import Navbar from "./components/Navbar"
import Search from './components/Search'
import NotFound from "./components/NotFound"


export const URLContext = createContext('http://localhost:3300')

class App extends Component {
  render() {
    return (
      <URLContext.Provider >

        <NotFound></NotFound>

        <Router>
          <div><Navbar /></div>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/artist/:artist" component={Artist} />
              <Route path="/lyrics/:artist/:track" component={Lyrics} />
              <Route path="/search/:looking_for" component={Search} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </URLContext.Provider>
    )
  }
}

export default App