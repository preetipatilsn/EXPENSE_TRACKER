import React, { useState, useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import classes from './Login.module.css';
import { Link } from 'react-router-dom';
import LoginMessage from '../components/LoginMessage';
import { loginActions } from '../store/loginSlice';

const Login = () => {
    const [haveAccount, setHaveAccount] = useState(true);
    // const [forgotPassword, setForgotPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
//   const navigate = useNavigate();
    

  const accountHandler = () => {
    setHaveAccount((preState) => {
      return !preState;
    });
  };

  let url;

  if (haveAccount) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDncz8xuHCf97stm52YbFh9jvASdOqjLC4';
  } else {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDncz8xuHCf97stm52YbFh9jvASdOqjLC4';
  }

  const loginFormHandler = async (event) => {
    event.preventDefault();

    if (!haveAccount) {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        return alert('Passwords does not match');
      }
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
          console.log('User has logged in');
          localStorage.setItem('idToken', JSON.stringify(data));
          setHaveAccount(true);
        //   emailRef.current.value = '';
        //   passwordRef.current.value = '';
          dispatch(loginActions.login());
        //   navigate('/profile');
      } else {
        const data = await res.json();
        throw data.error;
      }
    } catch (err) {
      alert(err.message);
    }
    };
    
    if (isLoggedIn) {
        return <LoginMessage />
    }

    return (
        <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={loginFormHandler}>
        <input type='email' placeholder='email' ref={emailRef} />
        <input type='password' placeholder='password' ref={passwordRef} />
        {!haveAccount && (
          <input
            type='password'
            placeholder='confirm password'
            ref={confirmPasswordRef}
          />
        )}
        <button type='submit'>
          {haveAccount ? 'Login' : 'Create Account'}
        </button>
        {haveAccount ? <Link to='/resetpassword'>Forgot Password?</Link> : ''}
      </form>
      <div className={classes.create} onClick={accountHandler}>
        {haveAccount
          ? `Don't have an account? Sign Up`
          : `Have an account? Sign In`}
      </div>
    </div>
  );
};
    
export default Login;