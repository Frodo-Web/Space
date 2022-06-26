import React from 'react';
import LoginForm from './components/LoginForm';
import './StartPage.css';

const StartPage = () => {
    return (
        <div className='startPage'>
            <div className="about">
                <div className="title">Space</div>
                <div className="description">Space is a simple social network, built with React and Express.</div>
            </div>
            <LoginForm />
        </div>
    )
}

export default StartPage;