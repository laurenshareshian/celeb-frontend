import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {newUser, newPreferences} from "../Constants";
import RegisterAccount from "../components/RegisterAccount";
//import Preferences from "../components/Preferences";
import {Redirect} from "react-router-dom";
import Login from "./Login";

const RegisterComponents = {
    ACCOUNT: "account",
    PROFILE: "profile",
    PREFERENCES: "preferences",
    LOGIN: "login"
};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToRender: RegisterComponents.ACCOUNT,
            userData: {},
            profileData: {
                firstName: '',
                lastName: '',
                gender: '',
                age: '',
                celebStatus: '',
                bio: '',
                picUrl: '',
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

    setEmailId = (emailId) => {
        this.setState(prevState => ({
            componentToRender: RegisterComponents.PROFILE,
            profileData: {
                ...prevState.profileData,
                fkEmailId: emailId
            }
        }))
    }

    handleProfileSubmit = (event) => {
        event.preventDefault();
        console.log("I'm here and 'this' = ", this);
        newUser(this.state.profileData)
            .then(userData => {
                console.log("userData: ", userData);
                this.setState(prevState => ({
                    ...prevState,
                    userData: userData,
                    componentToRender: RegisterComponents.PREFERENCES
                }))
            }).then(() => {
            console.log("I'm here and 'this' = ", this);
        });
    };

    handlePreferencesSubmit = (event) => {
        event.preventDefault();
        const savedPreferencesData = {
            ageMin: this.state.preferencesData.ageMin,
            ageMax: this.state.preferencesData.ageMax,
            gender: this.state.preferencesData.gender,
            fkProfileId: this.state.profileData.fkEmailId
        };
        newPreferences(savedPreferencesData)
            .then(userData => {
                this.setState({
                    userData: userData,
                    componentToRender: RegisterComponents.LOGIN
                })
            });
    };

    render() {
        const {componentToRender, profileData, preferencesData} = this.state;
        console.log("this.state", this.state)
        if (componentToRender === RegisterComponents.ACCOUNT) {
            return <RegisterAccount setEmailId={this.setEmailId.bind(this)}/>
        } else if (componentToRender === RegisterComponents.PROFILE) {
            return <ProfileForm
                userData={profileData}
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleProfileSubmit.bind(this)}
            />
        } else if (componentToRender === RegisterComponents.PREFERENCES) {
            return <PreferencesForm
                userData={preferencesData}
                profileData={profileData}
                handlePreferencesChange={this.handlePreferencesChange.bind(this)}
                handlePreferencesSubmit={this.handlePreferencesSubmit.bind(this)}
            />
        } else {
            return (<Login/>)
        }
    }

}

function ProfileForm({userData, handleChange, handleSubmit}) {
    return (
        <div id="login">
            <h3 className="text-center text-white pt-5">Preferences form</h3>
            <div className="container">
                <br/>
                <h2>Create your profile</h2>
                <form onSubmit={handleSubmit}>
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <div className="form-group">
                                    <input type="text" name="firstName"
                                           value={userData.firstName} onChange={handleChange}
                                           className="form-control" placeholder="First Name"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="lastName"
                                           value={userData.lastName} onChange={handleChange}
                                           className="form-control" placeholder="Last Name"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="age"
                                           value={userData.age} onChange={handleChange}
                                           className="form-control" placeholder="Age"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="celebStatus"
                                           value={userData.celebStatus} onChange={handleChange}
                                           className="form-control" placeholder="Celeb Status"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="bio"
                                           value={userData.bio} onChange={handleChange}
                                           className="form-control" placeholder="Bio"/>
                                </div>
                                Enter https://bit.ly/newsuitor if you don't have a photo:
                                <div className="form-group">
                                    <input type="text" name="picUrl"
                                           value={userData.picUrl} onChange={handleChange}
                                           className="form-control" placeholder="Pic Url"/>
                                </div>
                                <div className="form-group">
                                    <label className="pr-sm-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="M"
                                            onChange={handleChange}
                                        /> Male
                                    </label>


                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="F"
                                            onChange={handleChange}
                                        /> Female
                                    </label>

                                    <br/>
                                </div>
                                <input type="submit"
                                       className="btn btn-info btn-md"
                                       value="Submit"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

function PreferencesForm({userData, profileData, handlePreferencesChange, handlePreferencesSubmit}) {
    return (
        <main>
            <form onSubmit={handlePreferencesSubmit}>
                <div className="container">
                    <h3 className="text-center text-white pt-5">Preferences form</h3>
                    <div className="container">
                        <br/>
                        <h2>Who are you interested in?</h2>
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