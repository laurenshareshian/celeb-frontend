import React, {Component} from 'react';
import MemberInfo from "./MemberInfo"
import Relationships from "../Constants";
import useSWR from "swr";

class ViewMember extends Component {
    constructor(props) {
        super(props)
        this.member = props.location.state.selectedMember;
        this.userData = props.location.state.userData;
        this.relationship = props.location.state.selectedRelationship;
        this.host = 'https://intense-refuge-49089.herokuapp.com';
    }

    render() {
        const {message, onClick} = this.computeStuff();
        return (
            <div>
                <MemberInfo userData={this.member}/>
                <DisplayAction message={message} onClick={onClick}/>
            </div>
        )
    }


    computeStuff() {
        if (this.relationship === Relationships.MATCHES.NAME) {
            return {
                message: "Send a Message",
                onClick: () => {
                    window.alert("Gunna send a love note")
                }
            };
        } else if (this.relationship === Relationships.ADMIRERS.NAME) {
            return {
                message: "Like them back?",
                onClick: () => {
                    window.alert("Now you're a match!")
                }
            };
        } else {
            return {
                message: "Do ya like 'em ?",
                onClick: () => {
                    window.alert("You like everybody ...")
                }
            };
        }
    }

    // fetchCompatibles(userId) {
    //     return this.useGiven(this.host + Relationships.COMPATIBLES.PATH + '/' + userId);
    // }
    // fetchAdmirers(userId) {
    //     return this.useGiven(this.host + Relationships.ADMIRERS.PATH + '/' + userId);
    // }
    // fetchMatches(userId) {
    //     return this.useGiven(this.host + Relationships.MATCHES.PATH + '/' + userId);
    // }
    //
    // useGiven(fullPath) {
    //     const {data, error} = useSWR(fullPath);
    //     return data;
    // }
}


function DisplayAction({message, onClick}) {
    return (
        <button
            onClick={onClick} >
            {message}
        </button>
    )
}

export default ViewMember