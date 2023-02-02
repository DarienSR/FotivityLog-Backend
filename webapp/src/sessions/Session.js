import React, { useState, useEffect } from 'react';
import { useInput } from "../hooks/useInput";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "../common/Alert";

export default function Session(props) {
  const { state } = useLocation();
  let session_start = new Date(props.session.start_time);
  let session_end = new Date(props.session.end_time);
  let [togglePopup, setTogglePopup] = useState(false);
  let [refreshToken, setRefreshToken] = useState(false);

  let [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const { value: topic, bind: bindTopic, reset: resetTopic } = useInput(props.session.topic);
  const { value: desc, bind: bindDesc, reset: resetDesc } = useInput(props.session.desc);
  const { value: startTime, bind: bindStartTime, reset: resetStartTime } = useInput(props.session.start_time.toLocaleString());

  let end = null;
  if(props.session.end_time != null) end = props.session.end_time.toLocaleString();

  const { value: endTime, bind: bindEndTime, reset: resetEndTime } = useInput(end);
  const { value: location, bind: bindLocation, reset: resetLocation } = useInput(props.session.location);
  const [ social, setSocial] = useState(props.session.social);
  const [ distracted, setDistracted] = useState(props.session.distracted);
  const [ focused, setFocused] = useState(props.session.focused);
  const [ deep_work, setDeepWork] = useState(props.session.deep_work);


  let [alert, setAlert] = useState("");
  let [alertIsVisible, setAlertIsVisible] = useState(false);
  let [alertError, setAlertError] = useState(false);

  const UpdateSession = (e) => {
    e.preventDefault()
    let values = { startTime, endTime, topic, desc, location, social, distracted, deep_work, user_id: state.id}
      axios.put(`${process.env.REACT_APP_URL}session/update/${props.session._id}`, values).then(function(response) {
      }).catch(function(err) {
    }); 
    setAlertIsVisible(true);
    setAlertError(false);
    setAlert("Session Updated");

    setTimeout(() => {
      setAlertIsVisible(false)
    }, 1500)
    setRefreshToken(!refreshToken)
    props.UpdateData();
  }
  

  function ConfirmDelete(value = !deleteConfirmation) {
    setDeleteConfirmation(value);
  }

  let deleteDisplay = <div>
    <p>Are you sure you want to delete</p>
    <button onClick={() => props.Delete(props.session._id)}>Yes</button>
    <button onClick={() => ConfirmDelete(false)}>No</button>
  </div>

  return (
    <>
      <div style={styles.sessionContainer} key={props.session._id} >
        <div onClick={() => setTogglePopup(!togglePopup)} style={styles.session}>
          <div style={styles.placeholder}></div>
          <p style={styles.p}>{ session_start.toDateString()  } { session_start.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
          <p style={styles.p}><b>{props.session.topic}</b></p>
          {end === null ? <p style={styles.p}>Current Session</p> : <p style={styles.p}>{ session_end.toDateString()  } { session_end.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>}
        </div>

        {deleteConfirmation ? deleteDisplay : null}
        
        <button onClick={() => ConfirmDelete(props.session._id)} style={styles.delete}>X</button>
      </div>

      { togglePopup ? <div style={styles.modal}>
         <form style={styles.form}>
        <Alert alert={ alert } isVisible={ alertIsVisible } alertError={ alertError }/>
         <p style={styles.close} onClick={() => setTogglePopup(!togglePopup)}>EXIT</p>
         <h1 style={ styles.header }>Edit Session</h1>
         <label style={styles.label}>Start Time <b>{ session_start.toLocaleString() }</b>
            <input style={styles.input} type="datetime-local" {...bindStartTime} />
          </label>

          <label style={styles.label}>End Time  <b>{ session_end.toLocaleString() }</b> 
          <input style={styles.input} type="datetime-local" {...bindEndTime} />
          </label>

          <label style={styles.label}>Topic
            <input style={styles.input} type="text" {...bindTopic} />
          </label>
          <label style={styles.label}>Description
            <input style={styles.input} type="text" {...bindDesc} />
          </label>
          <label style={styles.label}>Location
            <input style={styles.input} type="text" {...bindLocation} />
          </label>

          <div>
            <label style={styles.label}>Social
              <input style={styles.inputCB} type="checkbox" checked={social} onChange={() => setSocial(!social)} />
            </label>
            <label style={styles.label}>Distracted
            <input style={styles.inputCB} type="checkbox" checked={distracted}  onChange={() => setDistracted(!distracted)} />
            </label>
            <label style={styles.label}>Focused
            <input style={styles.inputCB} type="checkbox" checked={focused}  onChange={() => setFocused(!focused)} />
            </label>
            <label style={styles.label}>Deep Work
              <input style={styles.inputCB} type="checkbox" checked={deep_work} onChange={() => setDeepWork(!deep_work)} />
            </label>
          </div>
          <button style={ styles.button } onClick={UpdateSession}>Save</button>
        </form>
      </div> : null }
    </>
  )
}

let styles = {
  close: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginRight: '3rem',
    cursor: 'pointer',
    fontSize: '1.5rem',
  },
  sessionContainer: {
    display: 'flex',
    width: '60%',
    margin: '0 auto'
  },
  session: {
    width: '90%',
    backgroundColor: 'white',
    margin: '1rem auto',
    height: '3rem',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    padding: '0.25rem',
    boxShadow: '1px 2px 3px 2px rgb(157 157 157)',
    fontSize: '1.3rem',
    marginRight: 0,
  },
  placeholder: {
    width: '5%',
  },
  delete: {
    backgroundColor: 'white',
    margin: '1rem auto',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '3px 2px 3px 2px rgb(157 157 157)',
    fontSize: '1.3rem',
    border: 'none',
    marginLeft: 0
  },
  p: {
    width: '30%',
    alignSelf: 'center'
  },
  modal: {
    position: 'fixed',
    zIndex: 3, 
    bottom: '15rem',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  header: {
    borderBottom: '0.35rem solid black',
    paddingBottom: '0.5rem',
    width: '80%',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    margin: '0 auto',
    marginTop: '18%',
    width: '60%',
    flexDirection: 'column',
    backgroundColor: 'white', 
    boxShadow: '1px 2px 3px 4px #debbbb',
    height: '87%'
  },
  label: {
    width: '80%',
    alignSelf: 'center',
    fontSize: '1.5rem',
    padding: '0.75rem',
    fontWeight: 'bold',
    marginTop: '0.3rem',
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
  button: {
    width: '80%',
    alignSelf: 'center',
    fontSize: '1.5rem',
    padding: '0.75rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: 'white',
    marginTop: '1rem',
    marginBottom: '2rem',
    border: '3px solid black',
  },
}