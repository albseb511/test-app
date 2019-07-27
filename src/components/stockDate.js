import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Date,
  Dimensions
} from 'react-native';

import {
    withNavigation
} from 'react-navigation'

import Btn from './button'

//TO DO
// Add value
// Add real date values
// Integration Airtable
// Logic for displaying Add/Delete Button needs to be done. Check if val is null
// Function for Add, Delete

class StockDate extends Component {
    static propTypes = {
        date: PropTypes.string,
        val: PropTypes.string,
   }

   static defaultProps = {
        date:'X',
        val:'5000'
        //date: Date.new()
  }

   render(){
     return(
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen2',
                                                                     {  date: this.props.date,
                                                                         val : this.props.val},
                                                                     console.log('navigate via component, val=',this.props.val,
                                                                                'date=',this.props.date))}}>
        <View style={styles.MainContainer}> 
 
            <Text>{this.props.date}</Text>
            <Text>Val: {this.props.val!='5000'?this.props.val:'N/A'}</Text>
            <View style={styles.row}>
                {this.props.val==='5000'?(<Btn label='Add'/>):(<Btn label='Delete'/>)}
            </View>
        </View>
      </TouchableOpacity>

     )
   }
 }

 export default withNavigation(StockDate)

 const styles = StyleSheet.create({
    
  MainContainer :{
  
   flex:1,
   flexDirection:'column', 
   //marginTop: (Platform.OS) === 'ios' ? 10 : 10,
   //marginBottom: (Platform.OS) === 'ios' ? 10 : 10,
   alignItems: 'center',
   alignContent: 'center',
   alignSelf:'center',
   justifyContent: 'center',
   backgroundColor: 'white',
   borderRadius:10,
   borderWidth:1,
   borderColor:'gray',
   width: Dimensions.get('window').width/3-15,
   height:Dimensions.get('window').width/3-15,
   margin:5
   
   },
   row:{
       flex:1,
       flexDirection:'row'
   },
   button:{

   },
  
 });

 