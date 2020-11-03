import React, {Component} from 'react';

import {Redirect} from "react-router-dom";


class UserHome extends Component {
    constructor(props) {
        super(props);
        this.userData = props.location.state.userdata;
        this.state = {
            viewSelected: false,
            selectedPath: null
        };
    }

    getPath = name => {
        if (name === 'compatibles') {
            return '/compatibles'
        } else if (name === 'admirers') {
            return '/admirers'
        } else if (name === 'loveMatches') {
            return '/matches'
        } else {
            return null
        }
    }

    handleClick = (event) => {
        let viewRelationship = event.target.name;
        let path = this.getPath(viewRelationship)
        this.setState(
            {
                viewSelected: true,
                selectedPath: path
            }
        )
    }


    render() {
        const {profileId, name, gender, age, celebStatus, bio} = this.userData
        if (this.state.viewSelected) {
            const data = this.userData;
            const path = this.state.selectedPath;
            return (
                <Redirect
                    push
                    to={{
                        pathname: path,
                        state: {
                            userdata: data
                        }
                    }}
                />
            )
        }
        return (
            <div>
                <h1>{name}'s Profile</h1>
                <h3>Age: {age}</h3>
                <h3>Gender: {gender}</h3>
                <h3>Status: {celebStatus}</h3>
                <h3>Bio: {bio}</h3>

                <br/>

                <button className="btn btn-info btn-md" name='compatibles' onClick={this.handleClick}>
                    View Compatible Users
                </button>

                <br/>

                <button className="btn btn-info btn-md" name='admirers' onClick={this.handleClick}>
                    View Admirers
                </button>

                <br/>

                <button className="btn btn-info btn-md" name='loveMatches' onClick={this.handleClick}>
                    View Matches
                </button>
            </div>

        )
    }
}

export default UserHome