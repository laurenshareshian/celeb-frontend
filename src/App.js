import React, {Component} from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import {SWRConfig} from "swr";

import Login from "./views/Login";


import Header from "./components/Header";
import Footer from "./components/Footer";

const fetcher = (...args) => fetch(...args).then(response => response.json()).catch(err => console.error("error: " + err));

class App extends Component {
    render() {
        return (
            <SWRConfig value={{fetcher}}>
                <div className="App">
                    <Header/>
                    <Router>
                        <Route exact path="/" component={Login}/>
                    </Router>
                    <Footer/>
                </div>
            </SWRConfig>
        );
    }
}

export default App;
