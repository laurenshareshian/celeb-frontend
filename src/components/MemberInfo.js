import React from "react";


let MemberInfo = props => {
    console.log("props in info")
    console.log(props)
    if (props.profileData) {
        return (
            <div>
                <h1>Welcome back, {props.profileData.firstName} {props.profileData.lastName}!</h1>

            </div>
        )
    }
    return (<div>hello</div>)
}

export default MemberInfo