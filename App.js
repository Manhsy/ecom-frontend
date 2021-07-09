import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import Header from './src/shared/header'
import {NavigationContainer} from '@react-navigation/native';

//redux 
import {Provider} from 'react-redux';
import store from './src/redux/store'

//navigators
import Main from './src/Navigators/Main'

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store = {store}>
      <NavigationContainer>
          <Header/>
          <Main />
      </NavigationContainer>
    </Provider>

  );
}
