import React, {useState} from 'react'
import SignUpInput from '../components/SignUp/SignUpInput'
import SignIn from '../components/buttons/SignIn'
import './Newaccount.css'
import LoginInput from '../components/login/LoginInput'
import style from '../components/SignUp/SignUpInput.module.css'
import { useAuth } from "../hooks/AuthProvider";



function Newaccount() {

    const [input, setInput] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        email:""
      });

      const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const auth = useAuth();
      const handleSubmitEvent = async (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "" && input.email !== "" && input.passwordConfirm === input.password) {
            auth.registerAction(input);
         
        } else {
          alert("Please provide a username and password.");
        }
      };

    return (
        <div>
            <div className='titre'>
                <p className='titre1'>Create a New Account</p>
            </div>
            <form onSubmit={handleSubmitEvent}>
            <div className='inputcontainer22'>
                <div className={style.container1}>
                    <p className={style.texte}>UserName</p>
                    <input type="text" className={style.input}
                    value={input.username} onChange={handleInput}
                    name="username"

/>
                </div>
                <div className={style.container1}>
                    <p className={style.texte}>Email</p>
                    <input type="email" className={style.input}
                    value={input.email} onChange={handleInput}
                    name="email"

/>
                </div>
                <div className={style.container1}>
                    <p className={style.texte}>Password</p>
                    <input type="password" className={style.input}
                    value={input.password} onChange={handleInput}
                    name="password"

/>
                </div>
                <div className={style.container1}>
                    <p className={style.texte}>Password Confirm </p>
                    <input type="password" className={style.input}
                    value={input.passwordConfirm} onChange={handleInput}
                    name="passwordConfirm"

/>
                </div>
              

            </div>
            <div className='agree'>
                <label for="remember-me" class="checkbox-label">
                    <input type="checkbox" id="remember-me" name="remember-me" class="checkbox">
                    </input>
                    <p className='checkbox-label'>I agree to the Terms of Service & Privacy Policy</p>
                </label>
            </div>
            <div className='button'>
               <SignIn text='Sign Up'></SignIn>
            </div>
        </form>






        </div>
    )
}

export default Newaccount