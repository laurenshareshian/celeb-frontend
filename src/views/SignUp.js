import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {newUser} from "../Constants";
import RegisterAccount from "../components/RegisterAccount";
import Preferences from "../components/Preferences";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goToLogIn: false,
            userData: {
                firstName: '',
                lastName: '',
                gender: '',
                age: '',
                celebStatus: '',
                bio: '',
                fkEmailId: -1
            }
        };
    }

    handleChange = event => {
        const {name, value, type, checked} = event.target;
        let val = type === 'submit' ? checked : value;
        this.setState(prevState => ({
            userData: {
                ...prevState.userData,
                    [name]: val
            }
        }))
    };

    handleSubmit = (event) => {
        event.preventDefault();
        newUser(this.state.userData)
            .then(() => {
                this.setState({
                    goToLogIn: true
                })
            })
    };

    render() {
        const {goToLogin, userData} = this.state;
        if (userData.fkEmailId === -1) {
            return <RegisterAccount setEmailId={this.setEmailId.bind(this)}/>
        } else if (!goToLogin) {
            return <ProfileForm
                        userData={userData}
                        handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                    />
        } else {
            return <Preferences/>
        }

    }

    setEmailId = (emailId) => {
        console.log("this: ", this);
        this.setState({
            userData: emailId
        })
    }
}

function ProfileForm({userData, handleChange, handleSubmit}) {
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />

                <br/>

                <input
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />

                <br/>

                <input
                    name="age"
                    value={userData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                />

                <br/>

                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={userData.gender === "male"}
                        onChange={handleChange}
                        className="form-control"
                    /> Male
                </label>

                <br/>

                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={userData.gender === "female"}
                        onChange={handleChange}
                        className="form-control"
                    /> Female
                </label>

                <br/>

                <input
                    name="celebStatus"
                    value={userData.celebStatus}
                    onChange={handleChange}
                    placeholder="Celebrity Status"
                    required
                />

                <br/>

                <textarea
                    name="bio"
                    value={userData.bio}
                    onChange={handleChange}
                    placeholder="Biography"
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

export default SignUp