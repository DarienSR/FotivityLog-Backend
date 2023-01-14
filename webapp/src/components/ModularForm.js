/* 

<Form inputs=[ { field: "username", type: "text" } ] 
  submitForm={ 
    btnText: "Submit"
    onSubmit: function () { axios.post() } // does this submit then call parent alert function?
  }
  tile: "Add Session"
/>

*/



export default function ModularForm(props) {
  return (
    <form onSubmit={props.submitForm.onSubmit} style={styles.form}>
        <p style={styles.title}>{ props.title }</p>
        
        {
          props.inputs.map((input, idx) => {
            return <div key={ idx }>
              <label style={styles.text}>{ input.field }</label>
              <input {...input.bindInput}  type={input.type} style={input.type === 'checkbox' ? styles.checkbox : styles.input} />
            </div>
          })
        }
      
        <button style={styles.button} type="submit">{ props.submitForm.btnText }</button>
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
    marginTop: '20%',
    fontSize: 30,
    display: 'flex',
    width: '50%',
    flexDirection: 'column',
    backgroundColor: 'white', 
    borderTop: '0.5rem solid rgb(62 57 57)',
    boxShadow: '1px 4px 4px 3px #debbbb',
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
  text: {
    width: '80%',
    alignSelf: 'center',
    fontSize: '1.5rem',
    padding: '0.75rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    textAlign: 'left',
  }, 
  input: {
    width: '80%',
    marginLeft: '2rem',
    border: '2px solid black',
    fontSize: '1.5rem',
    padding: '0.4rem',
  }, 
  reset: {
    fontSize: '1.4rem',
    cursor: 'pointer',
    width: '60%',
  }
}