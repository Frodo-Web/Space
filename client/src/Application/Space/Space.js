import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Tabs from './components/Tabs';
import Wall from './components/Wall';
import Friends from './components/Friends';
import NoMatch from './components/NoMatch';
import './Space.css';

const Space = () => {
    const [user, setUser] = useState(null);
    const [info, setInfo] = useState(null);
    useEffect(() => {
        fetchSpace();
    }, [])
    const fetchSpace = async () => {
        try {
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            let response = await fetch(BASE_URL + '/space', {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json'
                },
            });
            if (response.status === 200) {
                response = await response.json();
                console.log(response);
                setUser(response);
            }
            else if (response.status === 403 ) {
                setInfo('You need to LogIn to see the page');
            } 
            else if (response.status === 401) {
                setInfo('Invalid token');
            } else {
                console.log('Fetch Space: response status !== 200');
                setInfo('Fetch Space: Something went wrong...');
            }
            
        }
        catch(e) {
            console.log("fetchSpace() has been failed!");
            console.log(e);
        }
    };
    console.log("Space.js renders");
    return (
        <>
            {(user !== null)
                ?
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Wall info={info} user={user} />} />
                        <Route path="friends" element={<Friends info={info} user={user} />} />
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
                :
                <h2 className='space info'>{info}</h2>
            }
        </>
    )
} 
export default Space;

const Layout = () => {
    return (
        <div className='space'>
            <Tabs />
            <Outlet />
        </div>
    )
};