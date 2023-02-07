import React, { useState } from 'react';
import axios from 'axios'
import { useInput } from "../hooks/useInput";
import ModularForm from '../common/ModularForm';
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
  <h3>We are currently not accepting any more users. If you are interested in this application please contact me at dsrsloan@gmail.com</h3>
  // <ModularForm 
  //   inputs = {[
  //   { field: 'Username', type:'text', bindInput: bindUsername }, 
  //   { field: 'Password', type:'password', bindInput: bindPassword },
  //   { field: 'Email', type:'text', bindInput: bindEmail },
  //   ]}
  //   submitForm = {{ btnText: 'Sign Up', onSubmit: SignUp }} title = 'Sign Up' />
 )
}



