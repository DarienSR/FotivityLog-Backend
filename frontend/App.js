/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import  {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Stack = createNativeStackNavigator();
import Session from './components/Session';


const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartSession" component={ Session } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
  },
  buttonStart: {
    backgroundColor: 'red',
    width: '50%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 30,
    padding: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default App;
