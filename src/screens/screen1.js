import React, {Component} from 'react'
import {Text,View} from 'react-native'

import styles from '../assets/style'

export default class Screen1 extends Component {
    constructor(props){
      super(props)
      this.state={
        
  
      }
    }
      render(){
          return(
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Screen1</Text>
                </View>
        
          )
      }
    }