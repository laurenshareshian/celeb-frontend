import React, {Component} from "react";
import {registerAccount} from "../Constants";

class RegisterAccount extends Component {
    constructor(props) {
        super(props);
        this.setEmailId = props.setEmailId;
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        registerAccount(this.state.email, this.state.password)
            .then(({emailId, email, password}) => {
                this.setEmailId(emailId);
            console.log('emailId', emailId);
            });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="container">
            <h3 className="text-center text-white pt-5">Register form</h3>
                <div className="container">
                    <h2> Register </h2>
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <div className="form-group">
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        placeholder="Email"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                        <input
                                            name="password"
                                            type="password"
                                            className="form-control"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            placeholder="Password"
                                            required
                                        />
                                </div>

                                <input type="submit"
                                       className="btn btn-info btn-md"
                                       value="Submit"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        )
    }
}

export default RegisterAccount