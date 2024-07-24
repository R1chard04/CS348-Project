import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <nav className="navbar">
            <div className="nav-center">
                <button className="nav-toggle" onClick={handleToggle}>
                    <div className="nav-icon"></div>
                </button>
                <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
                    <li>
                        <NavLink exact to="/" onClick={handleToggle} activeClassName="active-link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/bmi-calculator" onClick={handleToggle} activeClassName="active-link">Calculate BMI</NavLink>
                    </li>
                    <li>
                        <NavLink to="/add-recipe" onClick={handleToggle} activeClassName="active-link">Add a recipe</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
