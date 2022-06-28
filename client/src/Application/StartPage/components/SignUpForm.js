import React from "react";
import './SignUpForm.css';

const SignUpForm = ({ isShowForm, handleClick }) => {
  return (
    <div className={`signUpForm ${isShowForm ? "active" : ""} show`}>
      <form action="/sign-up" method="post">
        <span class="close" onClick={handleClick}>&times;</span>
        <input type="text" name="firstname" placeholder='First Name' />
        <input type="text" name="lastname" placeholder='Last Name' />
        <input type="text" name="email" placeholder='Email' />
        <input type="password" name="password" placeholder='Password' />
        <button className='signUp' type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;