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

import {connect} from 'react-redux'

import {withNavigation} from 'react-navigation'

import Btn from './button'

import Airtable from 'airtable'
import {API_KEY,APP_NAME,TABLE_NAME} from '../assets/airtable_api'


//import store from '../redux/configureStore'
//import {Provider} from 'redux'
//import {connect} from 'redux'

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
        id: PropTypes.string,
        data: PropTypes.object,
        updateFunction: PropTypes.func
   }

   static defaultProps = {
        date:'X',
        val:'5000',
        id:'',
        data:{},
        updateFunction: ()=> {}
  }
  _HandleCellNav(){
    this.props.navigation.navigate('Screen2',
    {  date: this.props.date,
        val :this.props.val!='5000'?this.props.val:'N/A',
        id: this.props.id,
        data: this.props.data},
    console.log('navigate via component, val=',this.props.val,
               'date=',this.props.date,
               'id = ',this.props.id,))
  }

  _HandleButton(){
    var base = new Airtable({apiKey: API_KEY}).base(APP_NAME);
    if(this.props.val!='5000')
    {   
        base(TABLE_NAME).update(this.props.data.id,{
            "Value": ''
          }, function(err, record) {
            if (err) {
              console.error(err);

            Alert.alert('ERROR\nPLEASE TRY AGAIN')
            console.log('error. Delete was not success')

              return;
            }
            console.log('Delete was success')
            console.log('Need to invoke update')
            // this.props.dispatch(type:'REFRESH')
            console.log(record.getId());
            
            
          })
    }
    else{
        console.log('Add a value, redirect to screen 2')
        this._HandleCellNav()
    }
  }
  constructor(props)
  {
      super(props)
      this.props.updateFunction.bind(this)
  }

   render(){
     return(
        
            <TouchableOpacity onPress={()=>{this._HandleCellNav()}}>
                <View style={styles.MainContainer}> 
        
                    <Text>{this.props.date}{this.props.test}</Text>
                    <Text>Val: {this.props.val!='5000'?this.props.val:'N/A'}</Text>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={()=>this._HandleButton()}>
                        {this.props.val==='5000'?(<Btn label='Add'/>):(<Btn label='Delete'/>)}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
      

     )
   }
 }

 mapStateToProps=(state)=>{
   return{
     rCheck: state.rCheck,
     test: state.test
   }
 }


 export default connect(mapStateToProps)(withNavigation(StockDate))

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
   width: Dimensions.get('window').width/3-25,
   height:Dimensions.get('window').width/3-25,
   margin:12
   
   },
   row:{
       flex:1,
       flexDirection:'row'
   },
   button:{

   },
  
 });

 