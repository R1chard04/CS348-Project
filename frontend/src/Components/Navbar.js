const { useState } = require('react');
const { Link } = require('react-router-dom');

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <nav className="navbar">
            <div className="nav-center">
                <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;