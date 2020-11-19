import React, {Component} from 'react';

import MemberInfo from "./MemberInfo"
import Preferences from './Preferences';
import Profile from './Profile';
import {Relationships} from "../Constants";
import ListMembers from "./ListMembers";



class UserHome extends Component {
    constructor(props) {
        super(props);
        console.log("Props in UserHome", props);
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
    };

    render() {
        const relationshipIsSelected = this.state.relationshipSelected;
        if (this.state.selectedRelationship === 'Preferences') {
            return <Preferences userData={this.userData}/>
        }
        if (this.state.selectedRelationship === 'Profile') {
            return <Profile profileData={this.userData}/>
        }
        if (!relationshipIsSelected) {
            return <PresentOptions userData={this.userData} handleClick={this.handleClick} />
        }
        return (
            <div className="container">
                <ListMembers selectedRelationship={this.state.selectedRelationship} userData={this.userData} />
                <button
                    className="btn btn-info btn-md"
                    onClick={this.backToProfile}>
                    Back to Profile
                </button>
            </div>
        )


    }

    backToProfile = () => {
        this.setState(
            {
                relationshipSelected: false,
                selectedRelationship: null
            }
        )
    }
}

function PresentOptions({userData, handleClick}) {
    return (
        <div className="content">
            <h1>Welcome back, {userData.firstName}!</h1>
            <MemberInfo userData={userData}/>
            <p/>

            <button
                className="btn btn-info btn-md"
                name="Profile"
                onClick={handleClick}>
                Manage Profile
            </button>

            <p/>

            <button
                className="btn btn-info btn-md"
                name="Preferences"
                onClick={handleClick}>
                Manage Dating Preferences
            </button>

            <p/>

            <button
                className="btn btn-info btn-md"
                name={Relationships.COMPATIBLES.NAME}
                onClick={handleClick}>
                View Compatible Users
            </button>

            <p/>

            <button
                className="btn btn-info btn-md"
                name={Relationships.ADMIRERS.NAME}
                onClick={handleClick}>
                View Admirers
            </button>

            <p/>

            <button
                className="btn btn-info btn-md"
                name={Relationships.MATCHES.NAME}
                onClick={handleClick}>
                View Matches
            </button>
        </div>
    )
}
export default UserHome