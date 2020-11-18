import React from "react";


let SuitorInfo = props => {
    console.log("props in info")
    console.log(props)
    if (props.userData) {
        return (
            <div className="container">
                <h3 className="text-center text-white pt-5">Suitor Info</h3>
                <h2>{props.userData.firstName} {props.userData.lastName}</h2>
                <img src={props.userData.picUrl} alt="Logo" />
                <br/>
                Gender: {props.userData.gender}
                <br/>
                Gender: {props.userData.age}
                <br/>
                Celeb Status: {props.userData.celebStatus}
                <br/>
                Bio: {props.userData.bio}
                <br/> <br/>
            </div>
        )
    }
    return (<div>hello</div>)
}

export default SuitorInfo