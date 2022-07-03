import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const handleLogout = async () => {
        try {
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            let response = await fetch(BASE_URL + '/logout', {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json'
                },
            });
            if (response.status === 200) {
                response = await response.json();
                console.log(response);
            }
            else {
                console.log('handleLogout: response status !== 200');
            }
        }
        catch (error) {
            console.log("handleLogout() has been failed!")
            console.log(error)
        }
    }
    return (
        <div className='navbar'>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/space'>Space</NavLink>
                <NavLink to='/users'>Users</NavLink>
                <a onClick={handleLogout}>Logout</a>
            </nav>
        </div>
    )
}

export default Navbar;