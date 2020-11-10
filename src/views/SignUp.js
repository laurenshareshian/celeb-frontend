import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {Redirect} from "react-router-dom";


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.host = 'https://intense-refuge-49089.herokuapp.com/';
        // this.host = 'http://localhost:8080/';
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
        const {name, value, type, checked} = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <main>
                <form>
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
                            value="M"
                            checked={this.state.gender === "M"}
                            onChange={this.handleChange}
                        /> Male
                    </label>

                    <br/>

                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            checked={this.state.gender === "F"}
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
                </form >
            </main>
        )
    }
}

export default SignUp