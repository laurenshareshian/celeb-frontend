import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import AddMatch from './AddMatch';

class Matches extends Component {
    constructor(props) {
        super(props);
        //this.host = 'http://localhost:8080/';
        this.host = 'https://intense-refuge-49089.herokuapp.com/';
        this.state = {matches: []};
    }

    componentDidMount() {
        this.fetchMatches();
    }

    onDelClick = (id) => {
        if (window.confirm('Are you sure to delete match?')) {
            fetch(this.host + 'api/dummymatches/delete-match' + id, {
                method: 'DELETE',
            }).then(res => this.fetchMatches())
                .catch(err => console.error(err));
        }
    };

    addMatch(match) {
        fetch(this.host + 'api/dummymatches/add-match', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(match)
        })
            .then(res => this.fetchMatches())
            .catch(err => console.log(err))
    }

    updateMatch(match) {
        fetch(this.host + 'api/dummymatches/update-match', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(match)
        })
            .then(res => this.fetchMatches())
            .catch(err => console.log(err))
    }

    editable = (cell) => {
        return (
            <div style={{backgroundColor: "#fafafa"}} contentEditable suppressContentEditableWarning onBlur={e => {
                const match = [...this.state.matches];
                match[cell.index][cell.column.id] = e.target.innerHTML;
                this.setState({matches: match});
            }}
                 dangerouslySetInnerHTML={{__html: this.state.matches[cell.index][cell.column.id]}}
            />
        );
    };


    render() {
        const columns = [{
            Header: 'Match First Name',
            accessor: 'firstName',
            Cell: this.editable
        }, {
            Header: 'Match Last name',
            accessor: 'lastName',
            Cell: this.editable
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => (
                <div>
                    <button onClick={() => this.onDelClick(row.original.id)}>Delete</button>
                </div>
            )
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => (
                <div>
                    <button onClick={() => this.updateMatch(row.original)}>Save</button>
                </div>
            )
        }

            ,];

        return (
            <div>
                <h1>Matches</h1>
                <AddMatch addMatch={this.addMatch} fetchMatches={this.fetchMatches}/>
                <ReactTable data={this.state.matches} columns={columns} filterable={true}/>
            </div>
        );
    }

    fetchMatches = () => {
        fetch(this.host + 'api/dummymatches/get-dummy-matches')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    matches: responseData
                })
            })
            .catch(err => console.error("error: " + err));
    }
}

export default Matches;
