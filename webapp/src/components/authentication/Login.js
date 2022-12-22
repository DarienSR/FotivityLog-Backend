import React, { useState } from 'react';
import axios from 'axios'
import { useInput } from "../../hooks/useInput";

export default function Login() {
  const { value: username, bind: bindUsername, reset: resetUsername } = useInput("");
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");

  function AttemptLogin(e) {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_URL}user/login`, {username, password}).then(function(response) {
      console.log("Login: ", response)
    }).catch(function(err) {
      console.log(err);
    }); 
  }

  return (
  <div>
    <form style={styles.form}>
    <h1>Login</h1>
      <label>Username
        <input type="text" {...bindUsername} />
      </label>

      <label>Password
        <input type="password" {...bindPassword} />
      </label>
      
      <button onClick={() => AttemptLogin()}>Login</button>
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