import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
                    {isOpen ? "Close" : "Menu"}
                </button>
                <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
                    <li>
                        <Link to="/" onClick={handleToggle}>Home</Link>
                    </li>
                    {/* <li>
                        <Link to="/about" onClick={handleToggle}>About</Link>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;