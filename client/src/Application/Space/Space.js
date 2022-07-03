import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Tabs from './components/Tabs';
import Wall from './components/Wall';
import Friends from './components/Friends';
import NoMatch from './components/NoMatch';

const Space = () => {
    return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Wall />} />
                    <Route path="friends" element={<Friends />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
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