import { useInput } from "../hooks/useInput";
import { useCheckbox } from "../hooks/useCheckbox";

import React, { useState, useEffect } from 'react';
import axios from 'axios'



export default function Add() {
  let [session, setSession] = useState("");
  let [refreshToken, setRefreshToken] = useState(false);

  // Check to see if there is an active session
  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}session/current`;
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
    axios.post(`${process.env.REACT_APP_URL}session/start`).then(function(response) {
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
  const { value: social, bind: bindSocial, reset: resetSocial } = useCheckbox(false);
  const { value: distracted, bind: bindDistracted, reset: resetDistracted } = useCheckbox(false);
  const { value: deep_work, bind: bindDeep_Work, reset: resetDeep_Work } = useCheckbox(false);

  const FinishSession = (e) => {
    e.preventDefault()
    let values = { topic, desc, location, social, distracted, deep_work }
    axios.put(`${process.env.REACT_APP_URL}session/finish`, values).then(function(response) {
      setRefreshToken(!refreshToken);
    }).catch(function(err) {
      console.log(err);
    }); 

    // Reset form
    resetTopic();
    resetDesc();
    resetSocial();
    resetLocation();
    resetDistracted();
    resetDeep_Work();
  }
  let FinishSessionForm = <form style={styles.form}>
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
    <label>Deep Work
      <input type="checkbox" {...bindDeep_Work} />
    </label>
    <button onClick={FinishSession}>Add Session</button>
  </form>

  return (
    <div>
      { session.length <= 0 ? StartSessionForm : FinishSessionForm  }
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