export default function Alert(props) {
  let display = <div></div>

    let styles = {
      container: {
        width: '30%',
        backgroundColor: props.alertError ? '#ffbaba' : '#bcffba',
        borderTop: '3px solid black',
        margin: '0 auto',
        padding: '0.2rem',
        boxShadow: '1px 3px 3px 2px #debbbb',
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

