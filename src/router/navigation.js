import React, {Component} from 'react'

import {View} from 'react-native'

import Screen1 from '../screens/screen1'
import Screen2 from '../screens/screen2'

import {createAppContainer,createStackNavigator} from 'react-navigation'


const Nav = createStackNavigator({
    Screen1:{
        screen:Screen1,
        navigationOptions: {
            headerVisible:false,
            header:null
          }},
    Screen2:{
        screen:Screen2,
        navigationOptions: {
            title: 'Screen 2',
          }}
}
)

const AppNav =  createAppContainer(Nav);

export default AppNav

