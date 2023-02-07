import Button from "../common/Button";
export default function ModularForm(props) {
  return (
    <form onSubmit={props.submitForm.onSubmit} style={styles.form}>
        <p style={styles.title}>{ props.title }</p>
        
        {
          props.inputs.map((input, idx) => {
            return <div key={ idx }>
              <label style={styles.text}>{ input.field }</label>

              <input {...input.bindInput}  type={input.type} style={input.type === 'checkbox' ? styles.inputCB : styles.input} />
            </div>
          })
        }
        <Button text={props.submitForm.btnText } />
    </form>
  )

}

let styles = {
  title: {
    borderBottom: '0.35rem solid black',
    paddingBottom: '0.5rem',
    fontSize: '3rem',
    fontWeight: 'bold'
  },
  form: {
    padding: 30,
    justifyContent: 'center',
    margin: '0 auto',
    marginTop: '5%',
    fontSize: 30,
    display: 'flex',
    width: '30%',
    flexDirection: 'column',
    backgroundColor: 'white', 
    borderTop: '0.5rem solid rgb(62 57 57)',
    boxShadow: '1px 4px 4px 3px #debbbb',
  },
  text: {
    fontSize: '1.5rem',
    padding: '0.75rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-start'
  }, 
  input: {
    border: '2px solid black',
    fontSize: '1.5rem',
    padding: '0.4rem',
    width: '80%'
  }, 
  inputCB: {
    border: '2px solid black',
    padding: '0.4rem',
    transform: 'scale(2)',
    margin: 'auto',
    float: 'left',
    marginLeft: '1.5rem'
  }, 
  reset: {
    fontSize: '1.4rem',
    cursor: 'pointer',
    width: '60%',
  }
}