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

  function HandleNavigation(url) {
    let collection = document.getElementsByClassName('nav-link');
    for(let i = 0; i < collection.length; i++) {
      if(collection[i].id === url) collection[i].style.borderBottom  = "4px solid black";
      else  collection[i].style.borderBottom  = "none";
    }
    navigate("/"+url, { state }) 
  }

  let nav = <div style={styles.components}>
  <p 
    onMouseEnter={(e) => e.target.style.backgroundColor = "#80808040"}
    onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
    id="organizer" className="nav-link" title="Organizer tab" onClick={() =>  HandleNavigation("organizer")} alt="Navigate to Organizer Tab" style={styles.link}>Organizer</p>
  <p 
    onMouseEnter={(e) => e.target.style.backgroundColor = "#80808040"}
    onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
    id="dashboard" className="nav-link" title="Dashboard Tab" onClick={() =>  HandleNavigation("dashboard")} alt="Navigate to Dashboard Tab" 
    style={{...styles.link, borderBottom: "4px solid black"}}>Dashboard</p>
  <p 
    onMouseEnter={(e) => e.target.style.backgroundColor = "#80808040"}
    onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
    id="add" className="nav-link" title="Add Sessions" onClick={() =>  HandleNavigation("add")} alt="Navigate to Add Session Tab" style={styles.link}>Add Session</p>
  <p 
    onMouseEnter={(e) => e.target.style.backgroundColor = "#80808040"}
    onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
    id="edit" className="nav-link" title="Edit Sessions" onClick={() =>  HandleNavigation("edit")} alt="Navigate to Edit Session Tab" style={styles.link}>Edit Sessions</p>
</div>

  return (
    <>
    <div style={styles.nav}>
      <h1 style={ styles.name }>FotivityLog</h1>
      { state === null ? <div style={styles.components}></div> : nav }
      <div style={styles.auth}>
        { isLoggedOn }       
      </div>
    </div>
    <div style={{paddingBottom: '7rem'}}></div>
    </>
  )
}

const styles = {
  name: {
    width: '20%',
    float: 'left',
  },
  nav: {
    height: "5rem",
    marginBottom: "2rem",
    borderBottom: '3px solid #eaeaea',
    boxShadow: '2px 1px #d3c9c9',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'fixed',
    width: '100%',
    backgroundColor: 'white',
    zIndex: 10
  },
  link: { 
    margin: '0rem 2rem',
    marginTop: '1.7rem',
    padding: "0.4rem",
    fontSize: "1.5rem",
    cursor: "pointer",
    alignSelf: 'center',
    borderRadius: "1%",
    transition: '0.6s',
    paddingBottom: 0,
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