import { useInput } from "../hooks/useInput";
import { useCheckbox } from "../hooks/useCheckbox";

import React, { useState, useEffect } from 'react';
import axios from 'axios'



export default function Add() {
  let [session, setSession] = useState("");
  let [refreshToken, setRefreshToken] = useState(false);

  // Check to see if there is an active session
  useEffect(() => {
    let url = `https://studysessiontracker.herokuapp.com/session/current`;
    axios.get(url).then(function(response) {
      console.log(response)
      setSession(response.data); // [0] is current Session
    }).catch(function(error) {
      console.log(error)
      alert("Error " + error.message + " | " + url)
    });
  }, [refreshToken]);

  const { value: startTime, bind: bindStartTime, reset: resetStartTime } = useInput("");

  function AddSession() {
    axios.post('https://studysessiontracker.herokuapp.com/session/start').then(function(response) {
      console.log(response);
      setRefreshToken(!refreshToken)
    }).catch(function(err) {
      console.log(err);
    }); 
  }
  let StartSessionForm = <button onClick={ AddSession }>START</button>


  // Finish


  const { value: topic, bind: bindTopic, reset: resetTopic } = useInput("");
  const { value: desc, bind: bindDesc, reset: resetDesc } = useInput("");
  const { value: location, bind: bindLocation, reset: resetLocation } = useInput("");
  const { value: social, bind: bindSocial, reset: resetSocial } = useCheckbox("");
  const { value: distracted, bind: bindDistracted, reset: resetDistracted } = useCheckbox(social);

  const FinishSession = (e) => {
    e.preventDefault()
    let values = { topic, desc, location, social, distracted }
    axios.put('https://studysessiontracker.herokuapp.com/session/finish', values).then(function(response) {
      setRefreshToken(!refreshToken);
    }).catch(function(err) {
      console.log(err);
    }); 

    // Reset form
    resetTopic();
    resetDesc();
    resetSocial();
    resetLocation()
    resetDistracted()
  }
  let FinishSessionForm = <form>
    <label>Topic
      <input type="text" {...bindTopic} />
    </label>
    <label>Description
      <input type="text" {...bindDesc} />
    </label>
    <label>Location
      <input type="text" {...bindLocation} />
    </label>
    <label>Social
      <input type="checkbox" {...bindSocial} />
    </label>
    <label>Distracted
      <input type="checkbox" {...bindDistracted} />
    </label>
    <button onClick={FinishSession}>Add Session</button>
  </form>

  return (
    <div>
      { session.length <= 0 ? StartSessionForm : FinishSessionForm  }
    </div>
  )
}