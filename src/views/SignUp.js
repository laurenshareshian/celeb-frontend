import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {newUser} from "../Constants";
import {Redirect} from "react-router-dom";


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            age: '',
            celebStatus: '',
            bio: ''
        };
    }

    handleChange = event => {
        const {name, value, type, checked} = event.target;
        let val = type === 'submit' ? checked : value;
        this.setState({
            [name]: val
        })
    };

    handleSubmit = event => {
        newUser(this.state)
    }

    render() {
        return (
            <main>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                        placeholder="First Name"
                        required
                    />

                    <br/>

                    <input
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        placeholder="Last Name"
                        required
                    />

                    <br/>

                    <input
                        name="age"
                        value={this.state.age}
                        onChange={this.handleChange}
                        placeholder="Age"
                        required
                    />

                    <br/>

                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={this.state.gender === "male"}
                            onChange={this.handleChange}
                        /> Male
                    </label>

                    <br/>

                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={this.state.gender === "female"}
                            onChange={this.handleChange}
                        /> Female
                    </label>

                    <br/>

                    <input
                        name="celebStatus"
                        value={this.state.celebStatus}
                        onChange={this.handleChange}
                        placeholder="Celebrity Status"
                        required
                    />

                    <br/>

                    <textarea
                        name="bio"
                        value={this.state.bio}
                        onChange={this.handleChange}
                        placeholder="Biography"
                        required
                    />
                    <br/>
                    <input type="submit"
                           name="submitClicked"
                           onClick={this.handleChange}
                           className="btn btn-info btn-md"
                           checked={this.state.submitClicked}
                           value="Sign up"/>
                </form >
            </main>
        )
    }
}

export default SignUp