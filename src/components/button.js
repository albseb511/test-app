import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';



export default class Btn extends Component {
    static propTypes = {
        label: PropTypes.string
   }

   static defaultProps = {
        label:''
        //date: Date.new()
  }

   render(){
     return(
        <View style={styles.button}> 
            <Text>{this.props.label}</Text>
      </View>

     )
   }
 }


 const styles = StyleSheet.create({
    
    button:{
        width:70,
        height:40,
        backgroundColor:'lightblue',
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    }
 });

 