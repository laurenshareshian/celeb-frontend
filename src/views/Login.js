import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {Redirect} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.host = 'https://intense-refuge-49089.herokuapp.com/';
        // this.host = 'http://localhost:8080/';
        this.state = {email: '', password: '', userData: {}, loggedIn: false};
    }

    login = () => {
        const user = {email: this.state.email, password: this.state.password};
        fetch(this.host + "api/login/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(jsonResponse => {
                this.setState({
                    userData: jsonResponse
                })
            })
            .then(()=>{
                this.setState({
                    loggedIn: true
                })
            })
            .catch(err => console.error(err))
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {loggedIn} = this.state;
        if (loggedIn) {
            const data = this.state.userData;
            return (<Redirect
                to={{
                    pathname: '/user',
                    state: {
                        userdata: data
                    }
                }}
            />)
        }
        return (
            <div id="login">
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    Profile: {JSON.stringify(this.state.userData)}
                    <br/>
                    Type in admin/admin:
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <div className="form-group">
                                    <input type="text" name="email" onChange={this.handleChange}
                                           className="form-control" placeholder="email"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" onChange={this.handleChange}
                                           className="form-control" placeholder="password"/>
                                </div>
                                <input type="submit" name="submit" onClick={this.login} className="btn btn-info btn-md"
                                       value="Login"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;