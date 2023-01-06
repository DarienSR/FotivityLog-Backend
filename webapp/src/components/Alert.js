export default function Alert(props) {
  let display = <div></div>

    let styles = {
      container: {
        width: '30%',
        backgroundColor: props.alertError ? '#ff3535' : '#35ff45',
        borderTop: '3px solid black',
        margin: '0 auto',
        padding: '0.1rem',
        boxShadow: '1px 3px gray',
        marginBottom: '0.5rem',
      },
      alert: {
        fontSize: '2rem',
        margin: 0,
        color: 'black',
      }
    }

  if(props.isVisible) display = <div style={ styles.container }>
    <p style={ styles.alert }>{ props.alert }</p>
  </div>

  return (
    <>
    { display }
    </>
  )
}

