import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import UserHome from './UserHome';
import {baseUrl} from "../Constants";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.host = baseUrl;
        this.state = {
            profileId: props.profileData.profileId,
            firstName: props.profileData.firstName,
            lastName: props.profileData.lastName,
            age: props.profileData.age,
            gender: props.profileData.gender,
            celebStatus: props.profileData.celebStatus,
            bio: props.profileData.bio,
            fkEmailId: props.profileData.fkEmailId,
            routeToUserHome: false
        };
    }

    editProfile = () => {
        const preferences = {
            profileId: this.state.profileId,
            firstName: this.state.firstName, lastName: this.state.lastName,
            gender: this.state.gender, age: this.state.age,
            celebStatus: this.state.celebStatus, bio: this.state.bio,
            fkEmailId: this.state.emailId
        };
        fetch(this.host + "/api/profile/update-profiles/" + this.state.profileId, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(preferences)
        })
            .catch(err => console.error(err));

        this.setState({routeToUserHome: true});
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        if (this.state.routeToUserHome) {
            return <UserHome userData={this.props.profileData}/>
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
                                           className="form-control" placeholder={this.state.firstName}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="lastName" onChange={this.handleChange}
                                           className="form-control" placeholder={this.state.lastName}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="age" onChange={this.handleChange}
                                           className="form-control" placeholder={this.state.age}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="celebStatus" onChange={this.handleChange}
                                           className="form-control" placeholder={this.state.celebStatus}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="bio" onChange={this.handleChange}
                                           className="form-control" placeholder={this.state.bio}/>
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
                                            checked={this.state.gender === "M"}
                                            onChange={this.handleChange}
                                        /> Male
                                    </label>


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