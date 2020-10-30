import React, {Component} from 'react';
import SkyLight from 'react-skylight';

class AddMatch extends Component {

    constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: ''};
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    };

    handleSubmit = (event) => {
        event.preventDefault();
        var match = {firstName: this.state.firstName, lastName: this.state.lastName};
        this.props.addMatch(match);
        this.refs.addDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3>Add Match</h3>
                    <form>
                        <input type="text" placeholder="First Name" name="firstName" onChange={this.handleChange}/><br/>
                        <input type="text" placeholder="Last Name" name="lastName" onChange={this.handleChange}/><br/>
                        <button onClick={this.handleSubmit}>Add</button>
                    </form>
                </SkyLight>
                <div>
                    <button style={{'margin': '10px'}}
                            onClick={() => this.refs.addDialog.show()}>Add match
                    </button>
                </div>
            </div>
        )
    }


}

export default AddMatch;
