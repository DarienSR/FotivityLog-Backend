export default function Session(props) {
  let session_start = new Date(props.session.start_time);
  let session_end = new Date(props.session.end_time);



  return (
    <div key={props.session._id} style={styles.session}>
      <button onClick={() => props.Edit()} style={styles.button}>Edit</button>
      <p style={styles.p}>{session_start.toDateString()  } { session_start.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
      <p style={styles.p}>{props.session.topic} - {props.session.desc}</p>
      <p style={styles.p}>{session_end.toDateString()  } { session_end.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
      <button onClick={() => props.Delete()} style={styles.button}>Delete</button>
    </div>
  )
}

let styles = {
  session: {
    width: '60%',
    backgroundColor: 'red',
    margin: '1rem auto',
    height: '3rem',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    padding: '0.25rem',
  },
  button: {
    width: '5%',
  },
  p: {
    width: '30%',
  }
}