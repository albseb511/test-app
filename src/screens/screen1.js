import React, {Component} from 'react'
import {Text,View, TouchableOpacity} from 'react-native'

import styles from '../assets/style'


export default class Screen1 extends Component {
    constructor(props){
      console.log('Home-page')
      super(props)
      this.state={
        value:'100'
  
      }
    }
      render(){
          return(
                <View style={styles.sectionContainer}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Screen2',
                                                                                  {val:this.state.value})}>
                        <Text style={styles.sectionTitle}>Screen1</Text>
                    </TouchableOpacity>  
                </View>
        
          )
      }
    }