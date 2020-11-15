import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {newUser, newPreferences} from "../Constants";
import RegisterAccount from "../components/RegisterAccount";
//import Preferences from "../components/Preferences";
import {Redirect} from "react-router-dom";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goToLogIn: false,
            goToPreferences: false,
            userData: {},
            profileData: {
                firstName: '',
                lastName: '',
                gender: '',
                age: '',
                celebStatus: '',
                bio: '',
                fkEmailId: -1
            },
            preferencesData: {
                ageMin: '',
                ageMax: '',
                gender: '',
                fkProfileId: ''
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

    handlePreferencesChange = event => {
        const {name, value, type, checked} = event.target;
        let val = type === 'submit' ? checked : value;
        this.setState(prevState => ({
            preferencesData: {
                ...prevState.preferencesData,
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

    handlePreferencesSubmit = (event) => {
        event.preventDefault();
        const savedPreferencesData = {
            ageMin: this.state.preferencesData.ageMin,
            ageMax: this.state.preferencesData.ageMax,
            gender: this.state.preferencesData.gender,
            fkProfileId: this.state.profileData.fkEmailId
        }
        newPreferences(savedPreferencesData)
            .then(userData => {
                this.setState({
                    userData: userData,
                    goToPreferences: true
                })
            });
    };

    render() {
        const {goToLogIn, goToPreferences, profileData, preferencesData} = this.state;
        if (profileData.fkEmailId === -1) {
            return <RegisterAccount setEmailId={this.setEmailId.bind(this)}/>
        } else if (!goToLogIn) {
            return <ProfileForm
                        userData={profileData}
                        handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                    />
        } else if (!goToPreferences) {
            console.log("We did it!")
            return <PreferencesForm userData={preferencesData}
                        profileData = {profileData}
                        handlePreferencesChange={this.handlePreferencesChange.bind(this)}
                        handlePreferencesSubmit={this.handlePreferencesSubmit.bind(this)}
                        />
        } else {
                return (<Redirect
                    push
                    to={{
                        pathname: '/',
                    }}
                />)
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
                        value="M"
                        checked={userData.gender === "M"}
                        onChange={handleChange}
                        className="form-control"
                    /> Male
                </label>

                <br/>

                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="F"
                        checked={userData.gender === "F"}
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

function PreferencesForm({userData, profileData, handlePreferencesChange, handlePreferencesSubmit}) {
    return (
        <main>
            <form onSubmit={handlePreferencesSubmit}>
                <div id="login">
                    <h3 className="text-center text-white pt-5">Preferences form</h3>
                    <div className="container">
                        <br/>
                        <h1>Who are you interested in?</h1>
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12">
                                    <div className="form-group">
                                        <input type="text" name="ageMin" onChange={handlePreferencesChange}
                                               className="form-control" placeholder="minimum age"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="ageMax" name="ageMax" onChange={handlePreferencesChange}
                                               className="form-control" placeholder="maximum age"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="pr-sm-2">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="M"
                                                onChange={handlePreferencesChange}
                                            /> Male
                                        </label>


                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="F"
                                                onChange={handlePreferencesChange}
                                            /> Female
                                        </label>

                                        <br/>
                                    </div>
                                    onChange={handlePreferencesChange}/>
                                    <input type="submit"
                                           className="btn btn-info btn-md"
                                           value="Submit"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    )
}
export default SignUp