import React, { useState } from 'react';
import './LoginForm.css';
import SignUpForm from './SignUpForm';
import { useNavigate } from 'react-router-dom';

const initialFormData = Object.freeze({
    email: "",
    password: ""
});

const LoginForm = () => {

    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setShowForm(!showForm);
    }

    const [formData, updateFormData] = useState(initialFormData);
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            const response = await fetch(BASE_URL + '/sign-in', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const jsonResponse = await response.json();
            if (response.status === 200) {
                console.log(jsonResponse);
                navigate('/space');
            } else {
                console.log(jsonResponse);
            }
        } catch(error) {
            console.log(error);
        }
    }
    const handleChange = (e) => {
        updateFormData({...formData, [e.target.name]: e.target.value.trim() })
    }
    return (
        <div className='loginForm'>
            <form onSubmit={handleSubmit}>
                <input name='email' type="text" placeholder='Email' onChange={handleChange} />
                <input name='password' type="password" placeholder='Password' onChange={handleChange} />
                <button className='login' type="submit">Login</button>
                <button className='createNew' type="button" onClick={handleClick}>Create new account</button>
            </form>
            <SignUpForm isShowForm={showForm} handleClick={handleClick} />
        </div>
    )
}

export default LoginForm;