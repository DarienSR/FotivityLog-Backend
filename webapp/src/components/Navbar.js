import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const { state } = useLocation();
  let navigate = useNavigate();
  let isLoggedOn;
  
  if(state === null) { 
    isLoggedOn = <>
    <p onClick={() =>  navigate("/login", { state })} style={ styles.text }>Login</p> 
    <p onClick={() => navigate("/signup", { state })} style={styles.text}>Sign Up</p>
    </>
  } else {
    isLoggedOn = <>
      <p style={ styles.text }>{ state.username }</p> 
      <p onClick={ () => navigate("/login", { state: null }) } style={ styles.text }>Logout</p>
    </> 
  }

  return (
    <>
    <div style={styles.nav}>
      <h1 style={ styles.name }>FocivityLog</h1>
      <div style={styles.components}>
        <img title="View Graphs" onClick={() => navigate("/dashboard", { state })} alt="Navigate to Graph Page" style={styles.image} src="./graph.png" />
        <img title="Add Sessions" onClick={() => navigate("/add", { state })} alt="Navigate to Add Session Page" style={styles.image} src="./add.png" />
        <img title="Edit Sessions" onClick={() =>  navigate("/edit", { state })} alt="Navigate to Edit Session Page" style={styles.image} src="./edit.png" />
      </div>
      <div style={styles.auth}>
        { isLoggedOn }       
      </div>
    </div>
    </>
  )
}

const styles = {
  name: {
    width: '20%',
  },
  nav: {
    height: "5rem",
    marginBottom: "2rem",
    borderBottom: '3px solid #eaeaea',
    boxShadow: '2px 1px #d3c9c9',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  image: {
    height: '50px',
    width: '50px',
    margin: '0rem 2rem',
    paddingTop: 15,
    cursor: "pointer",
  },
  text: {
    height: '50px',
    width: '50%',
    margin: '0rem 2rem',
    paddingTop: 15,
    cursor: "pointer",
    alignSelf: 'flex-end',
  },
  components: {
    display: 'flex',
    justifyContent: 'center',
    width: '60%',
  },
  auth: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '20%',
    fontSize: '1.5rem',
  }
}