import React, {Component} from 'react';
import SuitorInfo from "./SuitorInfo"
import {Relationships, setLike, setDislike, useRequest} from "../Constants";
import LoveNote from './LoveNote'
import ListMembers from "./ListMembers";


class ViewMember extends Component {
    constructor(props) {
        super(props);
        const {selectedMember, userData, selectedRelationship, userLikesMember} = props;
        this.selectedMember = selectedMember;
        this.userData = userData;
        this.selectedRelationship = selectedRelationship;
        this.state = {
            userLikesMember: userLikesMember,
            goBack: false,
        }
    }

    render() {
        if (this.state.goBack) {
            return <ListMembers selectedRelationship={this.selectedRelationship} userData={this.userData}/>
        }
        const userId = this.userData.profileId;
        const memberId = this.selectedMember.profileId;
        return (
            <div>
                <SuitorInfo userData={this.selectedMember}/>
                <p/>
                <LikeButton
                    source={this.userData}
                    target={this.selectedMember}
                    setUserLikesMember={this.setUserLikesMember.bind(this)}
                    userLikes={this.state.userLikesMember}/>
                <p/>
                {this.displayingMatches() ?
                    <LoveNote userId={userId} memberId={memberId}/> : null}
                <p/>
                <DisplayAction message={"Back to " + this.selectedRelationship}
                               onClick={() => this.setState({goBack: true})}/>
            </div>
        )
    }


    displayingMatches() {
        return this.selectedRelationship === Relationships.MATCHES.NAME;
    }

    setUserLikesMember = bool => res => {
        let type = bool ? "like" : "unlike";
        console.log("response to " + type + " event: ", res);
        this.setState({
            userLikesMember: bool,
        })
    }
}


function DisplayAction({message, onClick}) {
    return (
        <button
            className="btn btn-info btn-md"
            onClick={onClick}>
            {message}
        </button>
    )
}

function LikeButton({source, target, setUserLikesMember, userLikes}) {
    if (userLikes) {
        return <DisplayAction
            message={"Click to Unlike"}
            onClick={
                () => setDislike(source.profileId, target.profileId).then(setUserLikesMember(false))
            }
        />
    } else {
        return <DisplayAction
            message={"Click to like"}
            onClick={
                () => setLike(source.profileId, target.profileId).then(setUserLikesMember(true))
            }
        />
    }
}


export default ViewMember