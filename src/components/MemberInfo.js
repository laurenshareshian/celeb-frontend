import React from "react";


let MemberInfo = props => {
    console.log("props in info")
    console.log(props)
    if (props.userData) {
        let splitName = member => {
            if (member.name !== undefined) {
                let [firstName, lastName] = member.name.split(" ");
                member.firstName = firstName
                member.lastName = lastName
                delete member.name
            }
            return member
        };
        const {firstName, lastName, age, gender, celebStatus, bio} = splitName(props.userData);
        return (
            <div>
                <h1>{firstName} {lastName}'s Profile</h1>
                <h3>Age: {age}</h3>
                <h3>Gender: {gender}</h3>
                <h3>Status: {celebStatus}</h3>
                <h3>Bio: {bio}</h3>
            </div>
        )
    }
    return (<div>hello</div>)
}

export default MemberInfo