import React from "react";


let MemberInfo = props => {
    console.log("props in info")
    console.log(props)
    if (props.userData) {
//        let splitName = member => {
//            if (member.name !== undefined) {
//                let [firstName, lastName] = member.name.split(" ");
//                member.firstName = firstName
//                member.lastName = lastName
//                delete member.name
//            }
//            return member
//        };
//        const {firstName, lastName, age, gender, celebStatus, bio} = splitName(props.userData);
        return (
            <div>
                <h1>Welcome back, {props.userData.firstName} {props.userData.lastName}!</h1>

            </div>
        )
    }
    return (<div>hello</div>)
}

export default MemberInfo