import React from "react";


let SuitorInfo = props => {
    console.log("props in info");
    console.log(props);
    const {firstName, lastName, age, gender, bio, celebStatus, picUrl} = props.userData;
    return (
        <div className="container">
            <h3 className="text-center text-white pt-5">Suitor Info</h3>
            <h2>{firstName} {lastName}</h2>
            <img src={picUrl} alt="Logo"/>
            <br/>
            Gender: {gender}
            <br/>
            Gender: {age}
            <br/>
            Celeb Status: {celebStatus}
            <br/>
            Bio: {bio}
            <br/> <br/>
        </div>
    )
}


export default SuitorInfo