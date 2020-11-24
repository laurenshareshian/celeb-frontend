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
            return <ViewMember selectedMember={selectedMember} userData={userData} selectedRelationship={selectedRelationship}/>//goBack={this.goBack.bind(this)}/>
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

function MemberTable({title, handleClick, userId}) {
    let data = {
        compatibles: useRequest(Relationships.COMPATIBLES.PATH, userId).data,
        admirers: useRequest(Relationships.ADMIRERS.PATH, userId).data,
        matches: useRequest(Relationships.MATCHES.PATH, userId).data,
    };
    let members;
    if (title === Relationships.COMPATIBLES.NAME) {
        members = data.compatibles;
    } else if (title === Relationships.ADMIRERS.NAME) {
        members = data.admirers;
    } else {
        members = data.matches;
    }

    const columns = [{
        accessor: 'firstName',
        editable: false
    }, {
        accessor: 'lastName',
        editable: false
    }, {
        sortable: false,
        filterable: false,
        width: 120,
        Cell: row => {
            let member = row.original;
            return (
                <div>
                    <button className="btn btn-info btn-md" onClick={handleClick(member)}>View Profile</button>
                </div>
            )
        }
    }];
    return (
        <div className="container">
            <h2>{title}</h2>
            <ReactTable data={members} columns={columns} pageSize={8}/>
        </div>
    );
}


export default ListMembers;
