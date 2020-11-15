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
            <main>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Email"
                        required
                    />

                    <br/>

                    <input
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                    />

                    <br/>

                    <input type="submit"
                           className="btn btn-info btn-md"
                           value="Submit"/>
                </form>
            </main>
        )
    }
}

export default RegisterAccount