import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {Relationships, useRequest} from "../Constants";


class ListMembers extends Component {
    constructor(props) {
        super(props);
        this.userData = props.location.state.userData || props.userData;
        this.selectedRelationship = props.location.state.selectedRelationship;
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
        let selectedMember = this.state.selectedMember;
        let selectedRelationship = this.selectedRelationship;
        if (selectedMember !== null) {
            const data = this.userData;
            return (<Redirect
                push
                to={{
                    pathname: '/member-profile',
                    state: {
                        profileData: data,
                        selectedMember: selectedMember,
                        selectedRelationship: selectedRelationship
                    }
                }}
            />)
        }
        return <MemberTable title={this.selectedRelationship} handleClick={this.viewProfile}
                            userId={this.userData.profileId}/>
    }

}

function MemberTable({title, handleClick, userId}) {
    let data = {
        compatibles: useRequest(Relationships.COMPATIBLES.PATH, userId).data,
        admirers: useRequest(Relationships.ADMIRERS.PATH, userId).data,
        matches: useRequest(Relationships.MATCHES.PATH, userId).data,
    }
    let members;
    if (title === Relationships.COMPATIBLES.NAME) {
        members = data.compatibles;
    } else if (title === Relationships.ADMIRERS.NAME) {
        members = data.admirers;
    } else {
        members = data.matches;
    }

    const columns = [{
        Header: 'Compatible First Name',
        accessor: 'firstName',
        editable: false
    }, {
        Header: 'Compatible Last name',
        accessor: 'lastName',
        editable: false
    }, {
        sortable: false,
        filterable: false,
        width: 100,
        Cell: row => {
            let member = row.original;
            return (
                <div>
                    <button onClick={handleClick(member)}>View Profile</button>
                </div>
            )
        }
    }];
    return (
        <div>
            <h1>{title}</h1>
            <ReactTable data={members} columns={columns} filterable={true}/>
        </div>
    );
}


export default ListMembers;
