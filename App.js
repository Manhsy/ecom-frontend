import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/shared/header'
import {NavigationContainer} from '@react-navigation/native';

//navigators
import Main from './src/Navigators/Main'

export default function App() {
  return (
    <NavigationContainer>
        <Header/>
        <Main />
    </NavigationContainer>

  );
}
