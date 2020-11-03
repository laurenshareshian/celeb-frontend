import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class Compatibles extends Component {
    constructor(props) {
        super(props);

        this.userdata = props.location.state.userdata;
        this.state = {
            compatibles: []
        };
        // this.host = 'http://localhost:8080/';
        this.host = 'https://intense-refuge-49089.herokuapp.com/';
    }

    componentDidMount() {
        this.fetchCompatibels();
    }

    viewProfile = id => () => {
        const {firstName, lastName} = this.state.compatibles.find(member => member.id === id)
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
                <h1>Compatible Members</h1>
                <ReactTable data={this.state.compatibles} columns={columns} filterable={true}/>
            </div>
        );
    }

    fetchCompatibels = () => {
        //Change once endpoint to Compatibles-given-user-id exists
        let pathToCompatiblesOfCurrentUser = 'api/dummymatches/get-dummy-matches';
        fetch(this.host + pathToCompatiblesOfCurrentUser)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    compatibles: responseData
                })
            })
            .catch(err => console.error("error: " + err));
    }
}

export default Compatibles;
