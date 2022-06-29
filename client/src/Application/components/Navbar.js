import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/users'>Users</NavLink>
            </nav>
        </div>
    )
}

export default Navbar;