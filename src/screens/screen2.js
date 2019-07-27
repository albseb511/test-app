import React, {Component} from 'react'
import {Text,View,
        TextInput,
        TouchableOpacity,
        Alert} from 'react-native'

import styles from '../assets/style'
import sc2 from '../assets/screen2style'
import PropTypes from 'prop-types';

//TODO
// Stock value to be displayed, passed from navigation props 
// - need to fix bug, default props is being fed always. 
// Check navigation props.

// Once change val to number only input
// Add/Edit button to push info after checking for valid response.
// Airtable integration
// add console.log wherever necessary

export default class Screen2 extends Component {
    
    constructor(props){
        console.log('Screen2 entered')
      super(props)
      this.state={
        value:this.props.val,
      }
    }

    _addBtn = () => {
        console.log('Add Button called')
        console.log(this.state.value)
        //CODE FOR PUSHING/UPDATING

        //END OF PUSH/UPDATE CODE

        //if failure do not stay on page, if/try
        success = 0
        if(success){
            Alert.alert('SUCCESS,\nnavigating to screen 1')
            console.log('navigating to screen 1')
            this.props.navigation.navigate('Screen1')

        }
        else
        {
            Alert.alert('ERROR\nPLEASE TRY AGAIN')
            console.log('error. update was not success')
        }
    }

      render(){
        const date = this.props.navigation.getParam('date', '');
        const val = this.props.navigation.getParam('val', '');
          return(
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Form</Text>

                    <View style={sc2.sctionRow}>
                        <Text style={sc2.text}>Date</Text>
                        <Text style={sc2.text}>{date}</Text>
                    </View>

                    <View style={sc2.sctionRow}>
                        <Text style={sc2.text}>Stock Value</Text>
                        <Text style={sc2.text}>{val}</Text>
                    </View>
                    
                    <Text style={styles.sectionTitle}>Change/Add Value</Text>
                    <TextInput  style={sc2.input} 
                                //onChange={(text) => this.setState({value:text})}
                                value={this.state.value}>{val}
                                    </TextInput>
                    <TouchableOpacity onPress={this._addBtn} style={sc2.btn}>
                        <Text style={sc2.btnText}>Add/Edit</Text>
                    </TouchableOpacity>

                </View>
        
          )
      }
    }