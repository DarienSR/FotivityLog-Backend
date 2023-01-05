import React, { useState } from 'react';
import axios from 'axios'
import { useInput } from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
export default function Login() {

  let navigate = useNavigate();

  const { value: username, bind: bindUsername, reset: resetUsername } = useInput("");
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${process.env.REACT_APP_URL}user/login`, {username, password})
    .then(function(response) {
      // set token in local storage
      window.localStorage.setItem("StudySession", response.data);
      navigate("/dashboard", { state: response.data });
    }).catch(function(error) {
      console.log("error", error)
    })

    resetUsername();
    resetPassword();
  }


  return (
  <div style={ styles.formContainer }>
    <form onSubmit={ handleSubmit } style={styles.form}>
    <h1 style={ styles.label }>Login</h1>
      <label style={ styles.text }>Username
        <input style={ styles.input } type="text" {...bindUsername} />
      </label>

      <label style={ styles.text }>Password
        <input style={ styles.input } type="password" {...bindPassword} />
      </label>
      
      <input style={styles.button} type="submit" value="Login" />
    </form>
      <p style={styles.reset} onClick={ () => { navigate('/resetpassword') } }>Reset Password</p>
  </div>
 )
}

let styles = {
  label: {
    borderBottom: '0.35rem solid black',
    paddingBottom: '0.5rem'
  },
  formContainer: {
    width: '50%',
    margin: '0 auto',
  },
  form: {
    padding: 30,
    justifyContent: 'center',
    margin: '0 auto',
    marginTop: '20%',
    fontSize: 30,
    display: 'flex',
    width: '50%',
    flexDirection: 'column',
    backgroundColor: 'white', 
    borderTop: '0.5rem solid rgb(62 57 57)',
    boxShadow: '1px 4px 4px 3px #debbbb',
  },
  button: {
    width: '80%',
    alignSelf: 'center',
    fontSize: '1.5rem',
    padding: '0.75rem',
    fontWeight: 'bold',
    backgroundColor: 'white',
    marginTop: '1rem',
    border: '3px solid black',
    cursor: 'pointer',
  },
  text: {
    width: '80%',
    alignSelf: 'center',
    fontSize: '1.5rem',
    padding: '0.75rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    textAlign: 'left',
  }, 
  input: {
    width: '80%',
    marginLeft: '2rem',
    border: '2px solid black',
    fontSize: '1.5rem',
    padding: '0.4rem',
  }, 
  reset: {
    fontSize: '1.4rem',
    cursor: 'pointer',
    width: '60%',
  }
}