import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class Admirers extends Component {
    constructor(props) {
        super(props);

        this.userdata = props.location.state.userdata;
        this.state = {
            admirers: []
        };
        // this.host = 'http://localhost:8080/';
        this.host = 'https://intense-refuge-49089.herokuapp.com/';
    }

    componentDidMount() {
        this.fetchAdmirers();
    }

    viewProfile = id => () => {
        const {firstName, lastName} = this.state.admirers.find(member => member.id === id)
        window.confirm('Will eventually display profile of ' + firstName + ' ' + lastName)
    }


    render() {
        const columns = [{
            Header: 'Compatible First Name',
            accessor: 'firstName',
            Cell: this.editable
        }, {
            Header: 'Compatible Last name',
            accessor: 'lastName',
            Cell: this.editable
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => {
                return (
                    <div>
                        <button onClick={this.viewProfile(row.original.id)}>View Profile</button>
                    </div>
                )
            }
        }];

        return (
            <div>
                <h1>Admirers</h1>
                <ReactTable data={this.state.admirers} columns={columns} filterable={true}/>
            </div>
        );
    }

    fetchAdmirers = () => {
        //Change once endpoint to Admirers-given-user-id exists
        let pathToCompatiblesOfCurrentUser = 'api/dummymatches/get-dummy-matches';
        fetch(this.host + pathToCompatiblesOfCurrentUser)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    admirers: responseData
                })
            })
            .catch(err => console.error("error: " + err));
    }
}

export default Admirers;
