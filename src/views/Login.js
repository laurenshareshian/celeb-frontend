import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {baseUrl} from "../Constants";
import UserHome from "../components/UserHome";
import SignUp from "./SignUp";

class Login extends Component {
    constructor(props) {
        super(props);
        this.host = baseUrl;
        this.state = {
            email: '',
            password: '',
            userData: {},
            error: {hasOccurred: false, message: "", count: 0},
            loggedIn: false
        };
    }

    login = () => {
        const user = {email: this.state.email, password: this.state.password};
        fetch(this.host + "/api/login/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error!")
                }
                console.log("response: ", response);
                return response.json();
            })
            .then(jsonResponse => {
                console.log("jsonResponse: ", jsonResponse);
                this.setState({
                    userData: jsonResponse,
                    loggedIn: true
                });
            })
            .catch(err => {
                let getOrd = n => {
                    if (10 < n && n < 20) {
                        return " " + n + "th";
                    }
                    let d = n % 10;
                    switch (d) {
                        case 1:
                            return " " + n + "st";
                        case 2:
                            return " " + n + "nd";
                        case 3:
                            return " " + n + "rd";
                        default:
                            return " " + n + "th";
                    }
                };

                let getMessage = count => {
                    let countMessage = ""
                    if (count > 1) {
                        countMessage = getOrd(count);
                    }
                    return "A" + countMessage + " log in error has occurred." +
                        " Please, try again or sign up with a new account.";
                };
                this.setState(prev => (
                    {
                        error: {
                            hasOccurred: true,
                            message: getMessage(prev.error.count + 1),
                            count: prev.error.count + 1
                        }
                    }));
            });
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {loggedIn, clickedSignUp} = this.state;
        if (loggedIn) {
            const data = this.state.userData;
            console.log('here data', data);
            return (<UserHome userData={data} />)
        } else if (clickedSignUp) {
            return (<SignUp/>)
        }
        return (
            <div className="container">
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    <br/>
                    Type in leo@gmail.com/leo to poke around or create a new account!
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
                                <label className="pr-sm-2">
                                    <input type="submit" name="submit" onClick={this.login}
                                           className="btn btn-info btn-md"
                                           value="Login"/>
                                </label>
                                <label className="pr-sm-2">
                                    <input type="submit" name="clickedSignUp" onClick={this.handleChange}
                                           className="btn btn-info btn-md"
                                           value="Sign up"/>
                                </label>
                                {this.state.error.hasOccurred ? this.displayMessage(this.state.error.message) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    displayMessage(message) {
        return <label>{message}</label>;
    }
}

export default Login;