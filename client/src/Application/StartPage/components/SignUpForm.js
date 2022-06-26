import React from "react";
import './SignUpForm.css';

const SignUpForm = ({ isShowForm, handleClick }) => {
  return (
    <div className={`signUpForm ${isShowForm ? "active" : ""} show`}>
      <form>
        <span class="close" onClick={handleClick}>&times;</span>
        <input type="text" placeholder='First Name' />
        <input type="text" placeholder='Last Name' />
        <input type="text" placeholder='Email' />
        <input type="text" placeholder='Password' />
        <button className='signUp' type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;