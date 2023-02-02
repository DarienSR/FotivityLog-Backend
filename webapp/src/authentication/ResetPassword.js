import React, { useState } from 'react';
import axios from 'axios'
import { useInput } from "../hooks/useInput";

export default function ResetPassword() {
  const { value: username, bind: bindUsername, reset: resetUsername } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");
  const { value: confirmPassword, bind: bindConfirmPassword, reset: resetConfirmPassword } = useInput("");

  function ResetPassword() {
    axios.post(`${process.env.REACT_APP_URL}user/resetpassword`, {username, password, email, confirmPassword}).then(function(response) {
      console.log("Sign up: ", response)
    }).catch(function(err) {
      console.log(err);
    }); 
  }

  return (
  <div>
    <form style={styles.form}>
    <h1>Reset Password</h1>
      <label>Username
        <input type="text" {...bindUsername} />
      </label>

      <label>Email
        <input type="text" {...bindEmail} />
      </label>

      <label>Password
        <input type="password" {...bindPassword} />
      </label>

      <label>Confirm Password
        <input type="password" {...bindConfirmPassword} />
      </label>
      
      <button onClick={() => ResetPassword}>Reset Password</button>
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