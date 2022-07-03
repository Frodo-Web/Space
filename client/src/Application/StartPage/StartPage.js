import React, { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import './StartPage.css';

const StartPage = () => {
    useEffect(() => {
        fetchIndex();
    }, [])
    const fetchIndex = async () => {
        try {
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            let response = await fetch(BASE_URL + '/index', {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json'
                },
            });
            if (response.status === 200) {
                response = await response.json();
            }
            else {
                console.log('Fetch Index: response status !== 200');
            }
        }
        catch (error) {
            console.log("fetchIndex() has been failed!")
            console.log(error)
        }
    }
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