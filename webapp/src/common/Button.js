export default function Button(props) {
  return (
    <div style={styles.container}>
      <button 
      onMouseEnter={(e) => {e.target.style.backgroundColor = '#000000d4'; e.target.style.color = 'white'; e.target.style.transition = ".75s"}} 
      onMouseLeave={(e) => {e.target.style.backgroundColor = 'white'; e.target.style.color = 'black'; e.target.style.transition = "0.75s"}} 
      style={styles.button} onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

let styles = {
  container: {
    display: "flex",
    justifiyContent: "center",
    width: "100%",
    flexDirection: 'column',
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
}