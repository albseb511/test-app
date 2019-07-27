import React, {Component} from 'react'
import {Text,View,
        TextInput,
        TouchableOpacity} from 'react-native'

import styles from '../assets/style'
import sc2 from '../assets/screen2style'

//TODO
// Stock value to be displayed, passed from navigation props
// Once change val to number only input
// Add/Edit button to push info after checking for valid response.
// Airtable integration

export default class Screen2 extends Component {
    constructor(props){
      super(props)
      this.state={
        val:'',
        stckVal:30
      }
    }
      render(){
          return(
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Form</Text>

                    <View style={sc2.sctionRow}>
                        <Text style={sc2.text}>Stock Value</Text>
                        <Text style={sc2.text}>{this.state.stckVal}</Text>
                    </View>
                    
                    <Text style={styles.sectionTitle}>Change/Add Value</Text>
                    <TextInput  style={sc2.input} 
                                onChangeText={(val) => this.setState({val})}
                                value={this.state.val}>
                                    </TextInput>
                    <TouchableOpacity style={sc2.btn}>
                        <Text style={sc2.btnText}>Add/Edit</Text>
                    </TouchableOpacity>

                </View>
        
          )
      }
    }