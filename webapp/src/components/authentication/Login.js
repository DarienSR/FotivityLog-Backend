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
  <div>
    <form onSubmit={ handleSubmit } style={styles.form}>
    <h1>Login</h1>
      <label>Username
        <input type="text" {...bindUsername} />
      </label>

      <label>Password
        <input type="password" {...bindPassword} />
      </label>
      
      <input type="submit" value="Login" />
    </form>
  </div>
 )
}

let styles = {
  form: {
    padding: 30,
    fontSize: 30,
    display: 'flex',
    margin: '0 auto',
    marginTop: '15%',
    width: '50%',
    flexDirection: 'column',
    backgroundColor: 'rgb(235 239 240)', 
    boxShadow: '1px 2px #debbbb',
  },
}