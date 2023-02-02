import React, { useState } from 'react';
import axios from 'axios'
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

import ModularForm from '../common/ModularForm';

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
  <ModularForm 
    inputs = {[
      { field: 'Username', type:'text', bindInput: bindUsername }, 
      { field: 'Password', type:'password', bindInput: bindPassword }
    ]} 
    submitForm = {{ btnText: 'Login', onSubmit: handleSubmit }} title = 'Login' />
 )
}

