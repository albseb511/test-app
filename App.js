import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Screen1 from './src/screens/screen1'
import AppNav from './src/router/navigation'

console.disableYellowBox = true;

class App extends Component{
  render(){
  return (
    <Screen1/>
  );
  }
};

export default AppNav