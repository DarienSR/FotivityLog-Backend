import { useInput } from "../hooks/useInput";
import { useCheckbox } from "../hooks/useCheckbox";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios'



export default function Add() {
  const { state, pathname } = useLocation();
  let navigate = useNavigate();

  let [session, setSession] = useState("");
  let [refreshToken, setRefreshToken] = useState(false);

  let [hasUpdatedTime, setHasUpdatedTime] = useState(false);

  // Check to see if there is an active session
  useEffect(() => {
    if(state !== null) {
      console.log(`${process.env.REACT_APP_URL}session/current/${state.id}`)
      axios.get(`${process.env.REACT_APP_URL}session/current/${state.id}`).then(function(response) {
        console.log("CURRENT PAGE", state.id, response)
        setSession(response.data); // [0] is current Session
      }).catch(function(error) {
        console.log(error)
        alert("Error " + error.message)
      });
    } else {
      navigate("/login", { state })
    }
  }, [refreshToken]);
  
  function getCurrentTime() {
    var currentdate = new Date(); 
    return currentdate.getFullYear() + "-"  +
     (currentdate.getMonth()+1)  + "-" 
     + currentdate.getDate() + "T"
                   + currentdate.getHours() + ":"  
                   + (String(currentdate.getMinutes())).padStart(2, '0');
              
  }

 
  const { value: startTime, bind: bindStartTime, reset: resetStartTime } = useInput(getCurrentTime());
  const { endTime, setEndTime} = useState();

  function AddSession() {
    alert(state.id)
    axios.post(`${process.env.REACT_APP_URL}session/start`, { start_time: document.getElementById('date').value, user_id: state.id  }).then(function(response) {
      console.log(response);
      setRefreshToken(!refreshToken)
    }).catch(function(err) {
      console.log(err);
    }); 
  }


  let StartSessionForm = 
  <div>
    <input id="date" type="datetime-local" value={startTime} />
    <button onClick={ AddSession }>START</button>
  </div>


  // Finish


  const { value: topic, bind: bindTopic, reset: resetTopic } = useInput("");
  const { value: desc, bind: bindDesc, reset: resetDesc } = useInput("");
  const { value: location, bind: bindLocation, reset: resetLocation } = useInput("");
  const { value: social, bind: bindSocial, reset: resetSocial } = useCheckbox(false);
  const { value: distracted, bind: bindDistracted, reset: resetDistracted } = useCheckbox(false);
  const { value: deep_work, bind: bindDeep_Work, reset: resetDeep_Work } = useCheckbox(false);

  const FinishSession = (e) => {
    e.preventDefault()
    let values = { user_id: state.id, topic, desc, location, social, distracted, deep_work, endTime: document.getElementById('endTime').value }
    axios.put(`${process.env.REACT_APP_URL}session/finish`, values).then(function(response) {
      console.log('res: ', response)
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
    <label>
      <input id="endTime" type="datetime-local" value={endTime} />
      <button onClick={function(e) {
        e.preventDefault()
        setHasUpdatedTime(true)
        document.getElementById('endTime').value = getCurrentTime();
      }}>Update Time</button>
    </label>
    {
      hasUpdatedTime ? <button onClick={FinishSession}>Add Session</button> : "Please select a time"
    }
    
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