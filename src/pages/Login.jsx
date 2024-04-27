import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SignIn from '../components/buttons/SignIn'
import './Login.css'
import Logo from '../assets/Logo.png'
//import { useState } from "react";
import style from '../components/login/Login.module.css'
import { useAuth } from "../hooks/AuthProvider";


function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  //const [loggedIn, setLoggedIn] = useState(false); // Placeholder state for successful login

  const auth = useAuth();
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
        auth.loginAction(input);
     
    } else {
      alert("Please provide a username and password.");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container111">
      <div className="Imagecontainer111">
        {/* Replace with your logo image */}
        <img src={Logo} alt="Logo" />
      </div>
      <div className="Inputcontainer111">
        <form onSubmit={handleSubmitEvent}>
          <div className={style.container}>
            <p className={style.texte}>UserName :</p>
            <input
              type="text"
              name="username"
              id="username"
              className={style.input}
              value={input.username}
              onChange={handleInput}
            />
          </div>
          <div className={style.container}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              className={style.input}
              value={input.password}
              onChange={handleInput}
            />
          </div>
                          <label for="remember-me" class="checkbox-label">
                    <input type="checkbox" id="remember-me" name="remember-me" class="checkbox">
                    </input>
                    <p className='checkbox-label'>Remember me</p>
                </label>
           <div className='signinbutton111'>
                    <SignIn text="Sign In"></SignIn>
                    <p className='texte'>Your first time here? <Link to='/register' style={{color:"black"}}><u>Click here to get started!</u></Link>  </p>
            </div>
        </form>
        
      </div>
    </div>
  );
}

export default Login;
