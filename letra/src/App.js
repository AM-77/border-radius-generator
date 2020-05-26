import React, { Component } from "react"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./components/Home"
import Lyrics from "./components/Lyrics"
import Artist from "./components/Artist"
import Navbar from "./components/Navbar"
import Search from "./components/Search"
import NotFound from "./components/NotFound"
import ListArtists from "./components/ListArtists"
import AppContext from "./AppContext"
import Footer from "./components/Footer"

class App extends Component {
  render() {
    return (
      <AppContext>
        <Router>
          <Navbar />
          <div className="wrapper">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/artist/:artist" component={Artist} />
              <Route path="/artists/:artist" component={ListArtists} />
              <Route path="/lyrics/:artist/:track" component={Lyrics} />
              <Route path="/search/:looking_for" component={Search} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>

      </AppContext>
    )
  }
}

export default App