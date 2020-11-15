import React, {Component} from 'react';

import {Redirect} from "react-router-dom";
import MemberInfo from "./MemberInfo"
import Preferences from './Preferences';
import Profile from './Profile';
import {Relationships} from "../Constants";


function ListRelationship({selectedRelationship, userData}) {
    return (
        <Redirect
            push
            to={{
                pathname: '/member-list',
                state: {
                    userData: userData,
                    selectedRelationship: selectedRelationship,
                }
            }}
        />
    )
}

function PresentOptions({userData, handleClick}) {

    return (
        <div>
            <MemberInfo userData={userData}/>
            <br/>

            <button
                className="btn btn-info btn-md"
                name="Profile"
                onClick={handleClick}>
                Manage Profile
            </button>

            <br/>

            <button
                className="btn btn-info btn-md"
                name="Preferences"
                onClick={handleClick}>
                Manage Dating Preferences
            </button>

            <br/>

            <button
                className="btn btn-info btn-md"
                name={Relationships.COMPATIBLES.NAME}
                onClick={handleClick}>
                View Compatible Users
            </button>

            <br/>

            <button
                className="btn btn-info btn-md"
                name={Relationships.ADMIRERS.NAME}
                onClick={handleClick}>
                View Admirers
            </button>

            <br/>

            <button
                className="btn btn-info btn-md"
                name={Relationships.MATCHES.NAME}
                onClick={handleClick}>
                View Matches
            </button>
        </div>
    )
}

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.userData = props.userData || props.location.state.userData;
        this.state = {
            relationshipSelected: false,
            selectedRelationship: null
        };
    }



    handleClick = (event) => {
        let relationship = event.target.name;
        this.setState(
            {
                relationshipSelected: true,
                selectedRelationship: relationship
            }
        )
    }

    render() {
        const relationshipIsSelected = this.state.relationshipSelected;
        if (this.state.selectedRelationship === 'Preferences') {
            return <Preferences userData={this.userData} />
        }
        if (this.state.selectedRelationship === 'Profile') {
            return <Profile profileData={this.userData} />
        }
        if (!relationshipIsSelected) {
            return <PresentOptions userData={this.userData} handleClick={this.handleClick} />
        }
        return <ListRelationship selectedRelationship={this.state.selectedRelationship} userData={this.userData} />
    }
}

export default UserHome