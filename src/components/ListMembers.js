import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {Relationships, useRequest} from "../Constants";
import ViewMember from "./ViewMember";


class ListMembers extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        const {selectedRelationship, userData} = props;
        this.userData = userData;
        this.selectedRelationship = selectedRelationship;
        this.state = {
            selectedMember: null
        };
    }


    viewProfile = orig => () => {
        this.setState({
            selectedMember: orig
        })
    }


    render() {
        const selectedMember = this.state.selectedMember;
        const selectedRelationship = this.selectedRelationship;
        const userData = this.userData;
        if (selectedMember !== null) {
            return <ViewTheMember selectedMember={selectedMember} userData={userData} selectedRelationship={selectedRelationship}/>//goBack={this.goBack.bind(this)}/>
        }
        return <MemberTable title={selectedRelationship} handleClick={this.viewProfile}
                            userId={userData.profileId}/>
    }

    goBack() {
        this.setState({
            selectedMember: null
        })
    }


}

function ViewTheMember({selectedMember, userData, selectedRelationship}) {
    const {data, error} = useRequest('/api/profile/get-admirers', selectedMember.profileId);
    if (error) {
        return <div>Error</div>
    }
    if (!data) {
        return <div>loading...</div>
    }
    let userLikesMember = data.filter(admirer => admirer.profileId === userData.profileId).length > 0;
    console.log("UserLikesMember?: ", userLikesMember);
    return <ViewMember
        selectedMember={selectedMember}
        userData={userData}
        selectedRelationship={selectedRelationship}
        userLikesMember={userLikesMember}
    />;
}

function CombineProfileWithMessage (members, messages)  {
    if (members && messages) {
        members.forEach((member) => {
            member.messageToDreamProfile = "";
            messages.forEach((message) => {
                if (member.profileId == message.fkProfileId)
                    member.messageToDreamProfile = message.messageToDreamProfile;
            });
        });
    }
    return members;
}

function MemberTable({title, handleClick, userId}) {
    let data = {
        compatibles: useRequest(Relationships.COMPATIBLES.PATH, userId).data,
        admirers: useRequest(Relationships.ADMIRERS.PATH, userId).data,
        matches: useRequest(Relationships.MATCHES.PATH, userId).data,
        messages: useRequest('/api/matches/get-messages', userId).data
    };
    console.log("messages", data.messages);
    console.log("matches", data.matches);

    let members;
    let messages;
    if (title === Relationships.COMPATIBLES.NAME) {
        members = data.compatibles;
    } else if (title === Relationships.ADMIRERS.NAME) {
        members = CombineProfileWithMessage(data.admirers, data.messages);
    } else {
        members = CombineProfileWithMessage(data.matches, data.messages);
    }

    let columns = [{
        Header: 'First Name',
        accessor: 'firstName',
        editable: false
    }, {
        Header: 'Last Name',
        accessor: 'lastName',
        editable: false
    },
    {
        sortable: false,
        filterable: false,
        Cell: row => {
            let member = row.original;
            return (
                <div>
                    <button className="btn btn-info btn-md" onClick={handleClick(member)}>View Profile</button>
                </div>
            )
        }
    }];
    if (columns && title !== Relationships.COMPATIBLES.NAME) {
        columns.splice(2, 0,
            {
                 Header: 'Personal Message',
                 accessor: 'messageToDreamProfile',
                 minWidth: 300,
                 editable: false
             }
        );
    };
    return (
        <div className="container">
            <h2>{title}</h2>
            <ReactTable data={members} columns={columns} pageSize={8}/>
        </div>
    );
}


export default ListMembers;
