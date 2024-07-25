import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('home');

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
                    <li className={`navbar-item ${selected === 'home' ? 'active' : ''}`} >
                        <NavLink exact to="/" onClick={() => {handleToggle(); setSelected('home')}} activeClassName="active-link">Home</NavLink>
                    </li>
                    <li className={`navbar-item ${selected === 'bmi' ? 'active' : ''}`} >
                        <NavLink to="/bmi-calculator" onClick={() => {handleToggle(); setSelected('bmi')}} activeClassName="active-link">Calculate BMI</NavLink>
                    </li>
                    <li className={`navbar-item ${selected === 'addrecipe' ? 'active' : ''}`} >
                        <NavLink to="/add-recipe" onClick={() => {handleToggle(); setSelected('addrecipe')}} activeClassName="active-link">Add a recipe</NavLink>
                    </li>
                    <li className={`navbar-item ${selected === 'recommend' ? 'active' : ''}`} >
                        <NavLink to="/recommend-recipes" onClick={() => {handleToggle(); setSelected('recommend')}} activeClassName="active-link">Recommended Recipes</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
