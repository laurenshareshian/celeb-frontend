import React, {Component} from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import {SWRConfig} from "swr";

import Login from "./views/Login";
import SignUp from "./views/SignUp";
import ListMembers from "./components/ListMembers";
// import Admirers from "./components/Admirers";
// import Matches from "./components/Matches";

import Header from "./components/Header";
import Footer from "./components/Footer";
import UserHome from "./components/UserHome";
import ViewMember from "./components/ViewMember"
const fetcher = (...args) => fetch(...args).then(response => response.json()).catch(err => console.error("error: " + err));
class App extends Component {
    render() {
        return (
            <SWRConfig value={{fetcher}}>
                <div className="App">
                    <Header/>
                    <Router>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/SignUp" component={SignUp}/>
                        <Route exact path="/login" component={Login}/>
                        {/*<Route exact path="/member-list" {props => <ListMembers {...props}/>}/>*/}
                        <Route exact path="/user" render={props => <UserHome {...props}/>}/>
                    </Router>
                    <Footer/>
                </div>
            </SWRConfig>
        );
    }
}

export default App;
