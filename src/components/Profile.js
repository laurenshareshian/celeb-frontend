import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import UserHome from './UserHome';
import {Redirect} from "react-router-dom";


class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.host = 'https://intense-refuge-49089.herokuapp.com/';
//         this.host = 'http://localhost:8080/';
        this.state = {
        profileId: props.userData.profileId,
        firstName: props.userData.firstName,
        lastName: props.userData.lastName,
        age: props.userData.age,
        gender: props.userData.gender,
        celebStatus: props.userData.celebStatus,
        bio: props.userData.bio,
        fkEmailId: props.userData.fkEmailId,
        routeToUserHome: false};
    }

    editProfile = () => {
        const preferences = {
        profileId: this.state.profileId,
        firstName: this.state.firstName, lastName: this.state.lastName,
        gender: this.state.gender, age: this.state.age,
        celebStatus: this.state.celebStatus, bio: this.state.bio,
        fkEmailId: this.state.emailId};
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
            return <UserHome userData={this.props.userData} />
        }
        return (
            <div id="login">
                <h3 className="text-center text-white pt-5">Preferences form</h3>
                <div className="container">
                    <br/>
                    <h1>Update your profile:</h1>
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
                                <input type="submit" name="submit" onClick={this.editProfile} className="btn btn-info btn-md"
                                       value="Submit"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Profile;