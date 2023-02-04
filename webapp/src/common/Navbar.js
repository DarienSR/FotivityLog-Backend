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
    let collection = document.getElementsByTagName('img');
    for(let i = 0; i < collection.length; i++) {
      if(collection[i].id === url) collection[i].style.borderBottom  = "4px solid black";
      else  collection[i].style.borderBottom  = "none";
    }
    navigate("/"+url, { state }) 
  }

  let nav = <div style={styles.components}>
  <img id="organizer" title="Edit Sessions" onClick={() =>  HandleNavigation("organizer")} alt="Navigate to Organizer Page" style={styles.image} src="./organizer.png" />
  <img id="dashboard" title="View Graphs" onClick={() => HandleNavigation("dashboard")} alt="Navigate to Graph Page" style={styles.image} src="./graph.png" />
  <img id="add" title="Add Sessions" onClick={() => HandleNavigation("add")} alt="Navigate to Add Session Page" style={styles.image} src="./add.png" />
  <img id="edit" title="Edit Sessions" onClick={() =>  HandleNavigation("edit")} alt="Navigate to Edit Session Page" style={styles.image} src="./edit.png" />
</div>

  return (
    <>
    <div style={styles.nav}>
      <h1 style={ styles.name }>FocivityLog</h1>
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
  image: {
    height: '50px',
    width: '50px',
    margin: '0rem 2rem',
    paddingTop: 15,
    cursor: "pointer",
    alignSelf: 'center',
    paddingBottom: '0.2rem',
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