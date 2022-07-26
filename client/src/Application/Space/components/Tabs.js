import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Tabs.css';

const Tabs = () => {
    console.log("Tabs.js renders");
    return (
        <div className='tabs'>
            <nav>
                <Link to='/space'>Wall</Link>
                <NavLink to='/space/friends'>Friends</NavLink>
            </nav>
        </div>
    )
}

export default Tabs;