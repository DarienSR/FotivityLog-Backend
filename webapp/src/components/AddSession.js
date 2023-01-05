import { useInput } from "../hooks/useInput";
import { useCheckbox } from "../hooks/useCheckbox";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function AddSession() {
  const { state } = useLocation();
  let navigate = useNavigate();

  let [session, setSession] = useState("");
  let [refreshToken, setRefreshToken] = useState(false);

  let [hasUpdatedTime, setHasUpdatedTime] = useState(false);

  // Check to see if there is an active session
  useEffect(() => {
    if(state !== null) {
      axios.get(`${process.env.REACT_APP_URL}session/current/${state.id}`).then(function(response) {
        setSession(response.data); // [0] is current Session
      }).catch(function(error) {
        alert("Error " + error.message)
      });
    } else {
      navigate("/login", { state })
    }
  }, [refreshToken]);
  
  function getCurrentTime() {
    var currentdate = new Date(); 
    return currentdate.getFullYear() + "-"  +
     (String(currentdate.getMonth())+1).padStart(2, '0')  + "-" 
     + (String(currentdate.getDate()).padStart(2, '0')) + "T"
                   + (String(currentdate.getHours())).padStart(2, '0') + ":"  
                   + (String(currentdate.getMinutes())).padStart(2, '0');
              
  }
  const { value: startTime } = useInput(getCurrentTime());  

  function StartNewSession() {
    axios.post(`${process.env.REACT_APP_URL}session/start`, { start_time: document.getElementById('date').value, user_id: state.id  }).then(function(response) {
      setRefreshToken(!refreshToken)
    }).catch(function(err) {
      console.log(err);
    }); 
  }

  let StartSessionForm = <div>
    <input id="date" type="datetime-local" value={ startTime } />
    <button onClick={ StartNewSession }>START</button>
  </div>

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
    <h1 style={ styles.label }>Add Session</h1>

    <label style={ styles.text }>Topic
      <input style={styles.input} type="text" {...bindTopic} />
    </label>
    <label style={ styles.text }>Description
      <input style={styles.input} type="text" {...bindDesc} />
    </label>
    <label style={ styles.text }>Location
      <input style={styles.input} type="text" {...bindLocation} />
    </label>
    <label style={ styles.text }>Social
      <input style={styles.inputCB} type="checkbox" {...bindSocial} />
    </label>
    <label style={ styles.text }>Distracted
      <input style={styles.inputCB} type="checkbox" {...bindDistracted} />
    </label>
    <label style={ styles.text }>Deep Work
      <input style={styles.inputCB} type="checkbox" {...bindDeep_Work} />
    </label>
    <label style={ styles.text }>
      <input id="endTime" style={styles.input} type="datetime-local" />
      <button style={styles.buttonUpdate} onClick={function(e) {
        e.preventDefault()
        setHasUpdatedTime(true)
        document.getElementById('endTime').value = getCurrentTime();
      }}>Update Time</button>
    </label>
    {
      hasUpdatedTime ? <button style={styles.button} onClick={FinishSession}>Add Session</button> : "Please select a time"
    }
  </form>

  return (
    <div>
      { session.length <= 0 ? StartSessionForm : FinishSessionForm  }
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
    marginTop: '1%',
    fontSize: 30,
    display: 'flex',
    width: '50%',
    flexDirection: 'column',
    backgroundColor: 'white', 
    borderTop: '0.5rem solid rgb(62 57 57)',
    boxShadow: '1px 4px 4px 3px #debbbb',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    fontSize: '1.5rem',
    padding: '0.75rem',
    fontWeight: 'bold',
    backgroundColor: 'white',
    marginTop: '1rem',
    border: '3px solid black',
    cursor: 'pointer',
  },
  buttonUpdate: {
    width: '30%',
    alignSelf: 'center',
    fontSize: '1.5rem',
    padding: '0.75rem',
    pointer: 'cursor',
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
    width: '100%',
    border: '2px solid black',
    fontSize: '1.5rem',
    padding: '0.4rem',
  }, 
  inputCB: {
    marginLeft: '2rem',
    border: '2px solid black',
    fontSize: '3.5rem',
    padding: '0.4rem',
    transform: 'scale(2)'
  }, 
  reset: {
    fontSize: '1.4rem',
    cursor: 'pointer',
    width: '60%',
  }
}
