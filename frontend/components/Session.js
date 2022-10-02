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

  function SubmitFinishSession(values) {
    values.social = toggleSocialCheckBox
    values.distracted = toggleDistractedCheckBox
    axios.put('https://studysessiontracker.herokuapp.com/session/finish', values).then(function(response) {
      console.log(values);
    }).catch(function(err) {
      console.log(err);
    }); 
  }

  const FinishSession = <><Formik initialValues={{ topic: '', desc: '', location: '' }} onSubmit={(values) => SubmitFinishSession(values)}>
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <Text>Topic</Text>
        <TextInput style={{}} onChangeText={handleChange('topic')} onBlur={handleBlur('topic')} value={values.topic} />
        <Text>Description</Text>
        <TextInput style={{}} onChangeText={handleChange('desc')} onBlur={handleBlur('desc')} value={values.desc} />
        <Text>Location</Text>
        <TextInput style={{}} onChangeText={handleChange('location')} onBlur={handleBlur('location')} value={values.location} />
        <Text>Social</Text>
        <CheckBox disabled={false} value={toggleSocialCheckBox} onValueChange={(newValue) => setToggleSocialCheckBox(newValue)} />
        <CheckBox disabled={false} value={toggleDistractedCheckBox} onValueChange={(newValue) => setToggleDistractedCheckBox(newValue)}/>
        <TouchableOpacity onPress={() => handleSubmit() }><Text style={{fontSize: 30, color: 'red'}}>FINISH</Text></TouchableOpacity>
      </View>
    )}
  </Formik></>
  
  function SubmitStartSession(values) {
    axios.post('https://studysessiontracker.herokuapp.com/session/start', values).then(function(response) {
      console.log(values);
    }).catch(function(err) {
      console.log(err);
    }); 
  }
  const StartSession = <View>
  <TouchableOpacity onPress={() => SubmitStartSession() }><Text style={{fontSize: 30, color: 'red'}}>START</Text></TouchableOpacity>
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
  }, []);

  return <View>
    { session.length <= 0 ? StartSession : FinishSession }
    <Text>{session.length}</Text>
  </View>
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'red'
  },
})
export default Session;