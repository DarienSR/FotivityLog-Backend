import React, { useState } from 'react';
import axios from 'axios'
import { useInput } from "../../hooks/useInput";

export default function SignUp() {
  const { value: username, bind: bindUsername, reset: resetUsername } = useInput("");
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");

  function SignUp() {
    axios.post(`${process.env.REACT_APP_URL}user/create`, {username, password, email}).then(function(response) {
      console.log("Sign up: ", response)
    }).catch(function(err) {
      console.log(err);
    }); 
  }

  return (
  <div style={ styles.formContainer }>
    <form style={styles.form}>
    <h1 style={ styles.label }>Sign up</h1>
      <label style={ styles.text }>Username
        <input style={ styles.input} type="text" {...bindUsername} />
      </label>

      <label style={ styles.text }>Password
        <input style={ styles.input} type="password" {...bindPassword} />
      </label>

      <label style={ styles.text }>Email
        <input style={ styles.input} type="text" {...bindEmail} />
      </label>
      
      <button style={styles.button} onClick={() => SignUp()}>Sign Up</button>
    </form>
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