import React, { useState, useRef } from 'react';

import classes from './Login.module.css';

const Login = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

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
        // const data = await res.json();
        console.log('User has logged in');
      } else {
        const data = await res.json();
        throw (data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={classes.mainDiv}>
      <form className={classes.form} onSubmit={loginFormHandler}>
        <input type='email' placeholder='email' ref={emailRef} />
        <input type='password' placeholder='password' ref={passwordRef} />
        {!haveAccount && <input
          type='password'
          placeholder='confirm password'
          ref={confirmPasswordRef}
        />}
        <button type='submit'>
          {haveAccount ? 'Login' : 'Create Account'}
        </button>
      </form>
      <div className={classes.login} onClick={accountHandler}>
        {haveAccount ? 'Create a new account' : 'Have an account? Login'}
      </div>
    </div>
  );
};

export default Login;