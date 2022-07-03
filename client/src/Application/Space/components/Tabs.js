import React from 'react';
import { NavLink } from 'react-router-dom';

const Tabs = () => {
    return (
        <div className='tabs'>
            <nav>
                <NavLink to='/space'>Wall</NavLink>
                <NavLink to='/space/friends'>Friends</NavLink>
            </nav>
        </div>
    )
}

export default Tabs;