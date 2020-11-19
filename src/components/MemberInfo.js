import React from "react";


let MemberInfo = props => {
    console.log("props in info");
    console.log(props);
    const {firstName, lastName, age, gender, bio, celebStatus, picUrl} = props.userData;
    return (
        <div class="w3-card">
            <h2>{firstName} {lastName}</h2>
            <img src={picUrl}/>
            <p>Age: {age}</p>
            <p>Gender: {gender}</p>
            <p>Celebrity Status: {celebStatus}</p>
            <p>Bio: {bio}</p>
        </div>
    )
};

export default MemberInfo