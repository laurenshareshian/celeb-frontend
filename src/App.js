import React, {Component} from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";
import './App.css';

import Login from "./views/Login";
import Compatibles from "./components/Compatibles";
import Admirers from "./components/Admirers";
import Matches from "./components/Matches";

import Header from "./components/Header";
import Footer from "./components/Footer";
import UserHome from "./components/UserHome";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Router>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/compatibles" component={Compatibles}/>
                    <Route exact path="/admirers" component={Admirers}/>
                    <Route exact path="/matches" component={Matches}/>
                    <Route exact path="/user" render={props => <UserHome {...props}/>}/>
                </Router>
                <Footer/>
            </div>
        );
    }
}

export default App;
