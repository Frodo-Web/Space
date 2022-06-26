import React, { useState } from 'react';
import './LoginForm.css';
import SignUpForm from './SignUpForm';

const LoginForm = () => {

    const [showForm, setShowForm] = useState(false);
    const handleClick = () => {
        setShowForm(!showForm);
    }
    return (
        <div className='loginForm'>
            <form>
                <input type="text" placeholder='Email' />
                <input type="text" placeholder='Password' />
                <button className='login' type="submit">Login</button>
                <button className='createNew' type="button" onClick={handleClick}>Create new account</button>
            </form>
            <SignUpForm isShowForm={showForm} handleClick={handleClick} />
        </div>
    )
}

export default LoginForm;