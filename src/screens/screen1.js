import React, {Component} from 'react'
import {Text,View, TouchableOpacity} from 'react-native'

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
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Screen2')}>
                        <Text style={styles.sectionTitle}>Screen1</Text>
                    </TouchableOpacity>  
                </View>
        
          )
      }
    }