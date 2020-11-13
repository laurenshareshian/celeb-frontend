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
            userData: {},
            profileData: {
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
            profileData: {
                ...prevState.profileData,
                    [name]: val
            }
        }))
    };

    handleSubmit = (event) => {
        event.preventDefault();
        newUser(this.state.profileData)
            .then(userData => {
                this.setState({
                    userData: userData,
                    goToLogIn: true
                })
            });
    };

    render() {
        const {goToLogIn, profileData} = this.state;
        if (profileData.fkEmailId === -1) {
            return <RegisterAccount setEmailId={this.setEmailId.bind(this)}/>
        } else if (!goToLogIn) {
            return <ProfileForm
                        userData={profileData}
                        handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                    />
        } else {
            console.log("We did it!")
            return <Preferences userData={this.state.userData}/>
        }

    }

    setEmailId = (emailId) => {
        this.setState(prevState => ({
            profileData: {
                ...prevState.profileData,
                fkEmailId: emailId
            }
        }))
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