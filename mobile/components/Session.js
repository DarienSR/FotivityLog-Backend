import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import CheckBox from '@react-native-community/checkbox';
const axios = require('axios');

import { Formik, Field, Checkbox, validateYupSchema } from 'formik';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';



const Session = ({ route, navigation }) : Node => {
  // load the page with data
  const [session, setSession] = useState([]);
  const [toggleSocialCheckBox, setToggleSocialCheckBox] = useState(false)
  const [toggleDistractedCheckBox, setToggleDistractedCheckBox] = useState(false)
  const [refreshToken, setRefreshToken] = useState(false);


  function SubmitFinishSession(values) {
    values.social = toggleSocialCheckBox
    values.distracted = toggleDistractedCheckBox
    axios.put('https://studysessiontracker.herokuapp.com/session/finish', values).then(function(response) {
      setRefreshToken(!refreshToken);
    }).catch(function(err) {
      console.log(err);
    }); 
  }

  const FinishSession = <><Formik initialValues={{ topic: '', desc: '', location: '' }} onSubmit={(values) => SubmitFinishSession(values)}>
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <Text style={styles.text}>Topic</Text>
        <TextInput style={styles.input} onChangeText={handleChange('topic')} onBlur={handleBlur('topic')} value={values.topic} />
        <Text style={styles.text}>Description</Text>
        <TextInput style={styles.input} onChangeText={handleChange('desc')} onBlur={handleBlur('desc')} value={values.desc} />
        <Text style={styles.text}>Location</Text>
        <TextInput style={styles.input} onChangeText={handleChange('location')} onBlur={handleBlur('location')} value={values.location} />
        <View style={{ alignItems: 'center'}}>
         <Text style={styles.text}>Social</Text>
          <CheckBox tintColors={'#9E663C'} disabled={false} value={toggleSocialCheckBox} onValueChange={(newValue) => setToggleSocialCheckBox(newValue)} />
          <Text style={styles.text}>Distracted</Text>
          <CheckBox tintColors={'#9E663C'} disabled={false} value={toggleDistractedCheckBox} onValueChange={(newValue) => setToggleDistractedCheckBox(newValue)}/>
        </View>
        <TouchableOpacity onPress={() => handleSubmit() }><Text style={styles.button}>FINISH</Text></TouchableOpacity>
      </View>
    )}
  </Formik></>
  
  function SubmitStartSession(values) {
    axios.post('https://studysessiontracker.herokuapp.com/session/start', values).then(function(response) {
      console.log(values);
      setRefreshToken(!refreshToken)
    }).catch(function(err) {
      console.log(err);
    }); 
  }
  const StartSession = <View>
  <TouchableOpacity onPress={() => SubmitStartSession() }><Text style={[styles.button, styles.middle]}>START</Text></TouchableOpacity>
  </View>

  useEffect(() => {
    let url = `https://studysessiontracker.herokuapp.com/session/current`;
    axios.get(url).then(function(response) {
      console.log(response)
      setSession(response.data); // [0] is current Session
    }).catch(function(error) {
      console.log(error)
      alert("Error " + error.message + " | " + url)
    });
  }, [refreshToken]);

  return <View>
    { session.length <= 0 ? StartSession : FinishSession }
    <Text>{session.length}</Text>
  </View>
}
const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    paddingTop: 4
  },
  middle: {
    alignSelf: 'center',
    marginTop: '75%'
  },
  input: {
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    color: 'black'
  },
  button: {
    borderWidth: 2,
    width: '90%',
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#f8f8ff',
    alignSelf: 'center',
    fontSize: 30,

  }
})
export default Session;