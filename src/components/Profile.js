import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import UserHome from './UserHome';
import {baseUrl} from "../Constants";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.host = baseUrl;
        this.state = {
            profileData: props.profileData,
            routeToUserHome: false
        };
    }

    editProfile = () => {
        const profileData = this.state.profileData;
        const preferences = {
            profileId: profileData.profileId,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            gender: profileData.gender,
            age: profileData.age,
            celebStatus: profileData.celebStatus,
            bio: profileData.bio,
            fkEmailId: profileData.emailId || profileData.fkEmailId
        };
        fetch(this.host + "/api/profile/update-profiles/" + preferences.profileId, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(preferences)
        })
            .then(resp => resp.json())
            .then(resp => this.setState({profileData: resp, routeToUserHome: true}))
            .catch(err => console.error(err));
    };


    handleChange = event => {
        const {name, value, type, checked} = event.target;
        this.setState(prevState => ({
            profileData: {
                ...prevState.profileData,
                [name]: value
            }
        }))
    };


    render() {
        if (this.state.routeToUserHome) {
            return <UserHome userData={this.state.profileData}/>
        }
        return (
            <div className="container">
                <br/>
                <h2>Update your profile:</h2>
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <div className="form-group">
                                <input type="text" name="firstName" onChange={this.handleChange}
                                       className="form-control" placeholder={this.state.profileData.firstName}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="lastName" onChange={this.handleChange}
                                       className="form-control" placeholder={this.state.profileData.lastName}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="age" onChange={this.handleChange}
                                       className="form-control" placeholder={this.state.profileData.age}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="celebStatus" onChange={this.handleChange}
                                       className="form-control" placeholder={this.state.profileData.celebStatus}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="bio" onChange={this.handleChange}
                                       className="form-control" placeholder={this.state.profileData.bio}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="picUrl" onChange={this.handleChange}
                                       className="form-control" placeholder={this.state.picUrl}/>
                            </div>
                            <div className="form-group">
                                <label className="pr-sm-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="M"
                                        checked={this.state.profileData.gender === "M"}
                                        onChange={this.handleChange}
                                    /> Male
                                </label>


                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="F"
                                        checked={this.state.profileData.gender === "F"}
                                        onChange={this.handleChange}
                                    /> Female
                                </label>

                                <br/>
                            </div>
                            <input type="submit" name="submit" onClick={() => this.setState({routeToUserHome: true})}
                                   className="btn btn-info btn-md"
                                   value="Go Back"/>
                            <input type="submit" name="submit" onClick={this.editProfile}
                                   className="btn btn-info btn-md"
                                   value="Submit"/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Profile;