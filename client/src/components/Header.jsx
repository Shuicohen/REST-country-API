import React from "react";
import "../styles/Header.css";

const Header = ({ theme, toggleTheme }) => {
    return (
        <header className="header">
            <h1>Where in the world?</h1>
            <button className="toggle-theme" onClick={toggleTheme}>
                {theme === "dark-mode" ? "Light Mode" : "Dark Mode"}
            </button>
        </header>
    );
};

export default Header;
