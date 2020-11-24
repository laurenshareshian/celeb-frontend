import React, {Component, useState} from 'react';
import SuitorInfo from "./SuitorInfo"
import {Relationships, setLike, setDislike, useRequest} from "../Constants";
import LoveNote from './LoveNote'
import ListMembers from "./ListMembers";


class ViewMember extends Component {
    constructor(props) {
        super(props);
        const {selectedMember, userData, selectedRelationship, goBack} = props;
        this.selectedMember = selectedMember;
        this.userData = userData;
        this.selectedRelationship = selectedRelationship;
        this.goBack = goBack;
        this.state = {
            count: 0,
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
                <LikeButton source={this.userData} target={this.selectedMember} update={() => this.setState(prev => ({count: prev.count + 1}))}/>
                <p/>
                {this.displayingMatches() ?
                    <LoveNote userId={userId} memberId={memberId}/> : null}
                <p/>
                <DisplayAction message={"Back to " + this.selectedRelationship} onClick={() => this.setState({goBack: true})}/>
            </div>
        )
    }


    displayingMatches() {
        return this.selectedRelationship === Relationships.MATCHES.NAME;
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

function LikeButton({source, target, update}) {
    const {data, error} = useRequest('/api/profile/get-admirers', target.profileId);
    if (error) {
        return <div>Yikes</div>
    }
    if (!data) {
        return <div>loading...</div>
    }

    let userLikesMember = data.filter(admirer => admirer.profileId === source.profileId).length > 0;
    if (userLikesMember) {
        return <DisplayAction
            message={"Click to Unlike"}
            onClick={
                () => setDislike(source.profileId, target.profileId).then(update)
            }
        />
    } else {
        return <DisplayAction
            message={"Click to like"}
            onClick={
                () => setLike(source.profileId, target.profileId).then(update)
            }
        />
    }
}

function useForceUpdate() {
    let [value, setValue] = useState(0);
    return () => setValue(value => ++value);
}


export default ViewMember