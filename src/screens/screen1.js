import React, {Component} from 'react'
import {Text,View, 
        TouchableOpacity,
        Image,
        FlatList,
        ScrollView} from 'react-native'

import styles from '../assets/style'
import StockDate from '../components/stockDate'

import { withNavigation } from "react-navigation";

//TODO
// Need to pass function as prop to child component stockDate.
// Bottom Panel - 
// 1. Map Sort based on val, and use corresponding dates.
// 2. Profits/Best case scenaria = 10*(sell price - buy price)
// 3. Map Purechart with data
import PureChart from 'react-native-pure-chart';

export default class Screen1 extends Component {
    constructor(props){
      console.log('Home-page')
      super(props)
      this.state={
        value:'100',
        data:{},
        chartData:{},
        rCheck:true
  
      }
    }
    
    getData() {
      console.log('getData called')
      return fetch('https://api.airtable.com/v0/appYgCzT4je4lJQUb/TestTable?api_key=keyxjWTbfhVKdNIva')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        
        this.setState({
          data: responseJson.records.sort((a,b)=>(a.fields.Date<b.fields.Date?1:-1)),
          chartData: responseJson.records.sort((a,b)=>(a.fields.val>b.fields.val?1:-1)),
          rCheck:false
        }, function(){
          
        });

      })
      .catch((error) =>{
        console.error(error);
      });
      
      console.log(rCheck)
    }

    onRef(){
      this.setState({rCheck:true})
    }

    componentDidMount() {
      var that = this;
      const { navigation } = this.props;
      this.focusListener = navigation.addListener("didFocus", () => {
        // The screen is focused
        // Call getData
        that.getData()
      });
      
      //console.log('rcheck=',rCheck)
      //that.state.rCheck?console.log('refresh'):console.log('no refresh')

    }
    componentWillUnmount() {
      // Remove the event listener
      this.focusListener.remove();
    }

    onDel(){
      console.log('refresh called onDel')
      this.getData()
    }
  

      render(){
        
        let sampleData2 = [
          {x: '2019-01-01', y: 30},
          {x: '2019-01-02', y: 200},
          {x: '2019-01-03', y: 170},
          {x: '2019-01-04', y: 250},
          {x: '2019-01-05', y: 10}
      ]
          return(
            <ScrollView>
                <View style={styles.sectionContainer}>
              

                        <Text style={styles.sectionTitle}>Screen1</Text>

                
                    <FlatList
                        data={this.state.data}
                        refreshing={this.state.rCheck}
                        onRefresh={()=>this.onRef()}
                        renderItem={({ item }) => (

                          <StockDate date={item.fields.Date} 
                                      val={item.fields.Value} 
                                      id={item.id} 
                                      data={item}
                                      updateFunction={()=>this.onDel()}/>
                        )}
                        //Setting the number of column
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                      />
                </View>
                <TouchableOpacity onPress={(i)=>console.log(this.state.data)}style={{marginTop:50}}>
                  <PureChart data={sampleData2} height={200}type='line' />
                </TouchableOpacity>
            </ScrollView>
        
          )
      }
    }