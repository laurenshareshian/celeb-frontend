import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Matches from "./../components/Matches";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', userData: {}};
    }

    login = () => {
        const user = {email: this.state.email, password: this.state.password};
        fetch("http://localhost:8080/api/login/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            const response = data;
            this.setState({
                userData: response,
            })
        })
        .catch(err => console.error(err))
    };

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        return (
            <div id="login">
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    {JSON.stringify(this.state.userData)}
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <div className="form-group">
                                    <input type="text" name="email" onChange={this.handleChange} className="form-control" placeholder="email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" onChange={this.handleChange}  className="form-control" placeholder="password" />
                                </div>
                                <input type="submit" name="submit" onClick={this.login} className="btn btn-info btn-md" value="Login"/>
                            </div>
                        </div>
                        <button className="btn btn-info btn-md">
                          <Link to={`/match`}>
                            Matches
                          </Link>
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;