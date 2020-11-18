import React from "react";
import logo from './images/heart.png';

export default function Header() {
    return (

        <header className="Header">
            <h1><a href="/"><img src={logo} alt="Logo" /></a></h1>
        </header>



    );
}
