import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import UserHome from './UserHome';
import {baseUrl} from "../Constants";

class Preferences extends Component {
    constructor(props) {
        console.log('props: ', props);
        super(props);
        this.host = baseUrl;
        this.state = {
            ageMin: 18,
            ageMax: 100,
            gender: '',
            fkProfileId: props.userData.profileId,
            routeToUserHome: false
        };
    }

    editPreferences = () => {
        const preferences = {
            ageMin: this.state.ageMin,
            ageMax: this.state.ageMax,
            gender: this.state.gender,
            fkProfileId: this.state.fkProfileId
        };
        fetch(this.host + "/api/preferences/update-preferences/" + this.state.fkProfileId, {
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
            return <UserHome userData={this.props.userData}/>
        }
        return (
            <div id="login">
                <h3 className="text-center text-white pt-5">Preferences form</h3>
                <div className="container">
                    <br/>
                    <h1>Who are you interested in?</h1>
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <div className="form-group">
                                    <input type="text" name="ageMin" onChange={this.handleChange}
                                           className="form-control" placeholder="minimum age"/>
                                </div>
                                <div className="form-group">
                                    <input type="ageMax" name="ageMax" onChange={this.handleChange}
                                           className="form-control" placeholder="maximum age"/>
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
                                <input type="submit" name="submit" onClick={this.editPreferences}
                                       className="btn btn-info btn-md"
                                       value="Submit"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Preferences;