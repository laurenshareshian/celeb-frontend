import React from "react";


let MemberInfo = props => {
    console.log("props in info")
    console.log(props)
    if (props.userData) {
        return (
            <div>
                <h2>Welcome back, {props.userData.firstName} {props.userData.lastName}!</h2>

            </div>
        )
    }
    return (<div>hello</div>)
}

export default MemberInfo