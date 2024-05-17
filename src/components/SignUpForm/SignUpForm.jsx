// SignInForm.jsx
import React, { useState } from 'react';
import './SignUpForm.css'
import registration from '../../assets/8cc484ac0cc6ec1affec4fc2938e1464.jpg';
const SignInForm = () => {

  return (
   <div className=' container d-flex align-items-center justify-content-between'>
   
   <img src={registration} alt='' className=' img-fluid'/>
   <div className=' flex-grow-1'>
    <form className=' d-flex flex-column ju'>
  <label htmlFor="email">Email:</label>
  <input type="email" id="email" name="email" required />
  <label htmlFor="phone">Phone Number:</label>
  <input type="tel" id="phone" name="phone" required />
  <label htmlFor="username">Username:</label>
  <input type="text" id="username" name="username" required />
  <label htmlFor="password">Password:</label>
  <input type="password" id="password" name="password" required />
  <input type="submit" defaultValue="Submit" className='w-50' />
</form>
   

   </div>
   </div>

  );
};

export default SignInForm;
