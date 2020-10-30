import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';

import Login from "./views/Login";
import Matches from "./components/Matches";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/match" component={Matches} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
