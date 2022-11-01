import React, { useState } from 'react';
import { useInput } from "../hooks/useInput";
import { useCheckbox } from '../hooks/useCheckbox';
import axios from 'axios';

export default function Session(props) {
  let session_start = new Date(props.session.start_time);
  let session_end = new Date(props.session.end_time);
  let [togglePopup, setTogglePopup] = useState(false);
  let [refreshToken, setRefreshToken] = useState(false);

  const { value: topic, bind: bindTopic, reset: resetTopic } = useInput(props.session.topic);
  const { value: desc, bind: bindDesc, reset: resetDesc } = useInput(props.session.desc);
  const { value: location, bind: bindLocation, reset: resetLocation } = useInput(props.session.location);
  const { value: social, bind: bindSocial, reset: resetSocial } = useCheckbox(props.session.social);
  const { value: distracted, bind: bindDistracted, reset: resetDistracted } = useCheckbox(props.session.distracted);
  const { value: deep_work, bind: bindDeep_Work, reset: resetDeep_Work } = useCheckbox(props.session.deep_work);

  const UpdateSession = (e) => {
    e.preventDefault()
    let values = { topic, desc, location, social, distracted, deep_work}
    axios.put('https://studysessiontracker.herokuapp.com/session/finish', values).then(function(response) {
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


  return (
    <>
      <div onClick={() => setTogglePopup(!togglePopup)} key={props.session._id} style={styles.session}>
        <div style={styles.placeholder}></div>
        <p style={styles.p}>{session_start.toDateString()  } { session_start.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
        <p style={styles.p}><b>{props.session.topic}</b></p>
        <p style={styles.p}>{session_end.toDateString()  } { session_end.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
        <button onClick={() => props.Delete(props.session._id)} style={styles.delete}>DELETE</button>
      </div>

      {togglePopup ? <div style={styles.form}>
         <form>
          <label style={styles.label}>Topic
            <input style={styles.input} type="text" {...bindTopic} />
          </label>
          <label style={styles.label}>Description
            <input style={styles.input} type="text" {...bindDesc} />
          </label>
          <label style={styles.label}>Location
            <input style={styles.input} type="text" {...bindLocation} />
          </label>
          <label style={styles.label}>Social
            <input style={styles.input} type="checkbox" {...bindSocial} />
          </label>
          <label style={styles.label}>Distracted
            <input style={styles.input} type="checkbox" {...bindDistracted} />
          </label>
          <label style={styles.label}>Deep Work
            <input style={styles.input} type="checkbox" {...bindDeep_Work} />
          </label>
          <button onClick={UpdateSession}>Save</button>
        </form>
      </div> : null }
    </>
  )
}

let styles = {
  session: {
    width: '60%',
    backgroundColor: 'rgb(235 239 240)',
    margin: '1rem auto',
    height: '3rem',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    padding: '0.25rem',
    boxShadow: '1px 2px #debbbb',
    fontSize: '1.3rem'
  },
  placeholder: {
    width: '5%',
  },
  delete: {
    width: '8%',
    backgroundColor: 'rgb(235 239 240)',
    border: 'none',
    borderLeft: '2px solid black',
    height: '100%',
    fontWeight: 'bold'
  },
  p: {
    width: '30%',
    alignSelf: 'center'
  },
  form: {

  },
  label: {
    margin: '1rem',
    fontSize: '1.3rem'
  },
  input: {
    marginLeft: '0.5rem',
    fontFamily: 'EB Garamond',
    fontSize: '1.3rem',
  }
}