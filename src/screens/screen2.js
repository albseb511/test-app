import React, {Component} from 'react'
import {Text,View,
        TextInput,
        TouchableOpacity,
        Alert,
        ScrollView} from 'react-native'

import styles from '../assets/style'
import sc2 from '../assets/screen2style'
import PropTypes from 'prop-types';

//Airtable
import Airtable from 'airtable'
import {API_KEY,APP_NAME,TABLE_NAME} from '../assets/airtable_api'

//TODO

export default class Screen2 extends Component {
    
    constructor(props){
        console.log('Screen2 entered')
      super(props)
      this.state={
        value:'',
      }
    }

    _addBtn = (id,date) => {
        console.log('Add Button called')
        console.log(this.state.value)
        //CODE FOR PUSHING/UPDATINGgit
        var base = new Airtable({apiKey: API_KEY}).base(APP_NAME);
        console.log(id)
        base(TABLE_NAME).update(data.id,{
            "Value": this.state.value
          }, function(err, record) {
            if (err) {
              console.error(err);

            Alert.alert('ERROR\nPLEASE TRY AGAIN')
            console.log('error. update was not success')

              return;
            }
            console.log(record.getId());
            
          });
          
        //END OF PUSH/UPDATE CODE

            Alert.alert('SUCCESS,\nnavigating to screen 1',this.state.value)
            console.log('navigating to screen 1')
            this.props.navigation.navigate('Screen1')
    }

      render(){
        const date = this.props.navigation.getParam('date', '');
        const val = this.props.navigation.getParam('val', '');
        const id = this.props.navigation.getParam('id', '');
        data = this.props.navigation.getParam('data', '');
        //console.log(date,val,id)
          return(
                <ScrollView style={styles.sectionContainer}>
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
                                onChangeText={value => this.setState({value})}
                                value={this.state.value}
                                keyboardType={'numeric'}
                                placeholder='enter new value' >
                                    </TextInput>
                    <TouchableOpacity onPress={(id,date)=>this._addBtn(id)} style={sc2.btn}>
                        <Text style={sc2.btnText}>Add/Edit</Text>
                    </TouchableOpacity>

                </ScrollView>
        
          )
      }
    }