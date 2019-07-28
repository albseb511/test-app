import React, {Component} from 'react'
import {Text,View, 
        TouchableOpacity,
        Image,
        FlatList,
        ScrollView,
        ActivityIndicator} from 'react-native'

import styles from '../assets/style'
import StockDate from '../components/stockDate'

import { withNavigation } from "react-navigation";

//TODO
// Need to pass function as prop to child component stockDate.
// Bottom Panel - 
// Map Purechart with data / HighCharts / D3
// Fix condition for NaN for profit check

import PureChart from 'react-native-pure-chart';
let testdata={}
export default class Screen1 extends Component {
    constructor(props){
      console.log('Home-page')
      super(props)
      this.state={
        value:'100',
        data:{},
        chartData:{},
        test:{},
        rCheck:true,
        d1:0,
        d2:0,
        max_highDiff:0
  
      }
    }
    
    getData=()=> {
      console.log('getData called')
      return fetch('https://api.airtable.com/v0/appYgCzT4je4lJQUb/TestTable?api_key=keyxjWTbfhVKdNIva')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        
        this.setState({
          data: responseJson.records.sort((a,b)=>(a.fields.Date>b.fields.Date?1:-1)),
          rCheck:false
        }, function(){
          this.setState({chartData: this.state.data})
          
        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }

 

    onRef(){
      this.setState({rCheck:true})
    }

    _profitCheck=()=>{
      console.log('profit check called')
      let len = this.state.chartData.length
      let diff = Array(len-1).fill(0)
      for(let i=0;i<len-1;i++)
        diff[i]= Array(len).fill(0)
      
        for(let i=0;i<len-1;i++)
          for(let j=i+1;j<len;j++)
            diff[i][j]= parseInt(this.state.chartData[j].fields.Value)-parseInt(this.state.chartData[i].fields.Value)
        console.log(diff,typeof(diff[0]),diff[0].length)

        let highDiff = Array(len-1).fill(0)
        for(let i=0;i<len-1;i++)
          highDiff[i]=diff[i].reduce((a,b)=>(a>b?a:b))
        
        this.setState({max_highDiff:highDiff.reduce((a,b)=>a>b?a:b)})
          console.log(this.state.max_highDiff)


        for(let i=0;i<len-1;i++)
          for(let j=0;j<len;j++)
          if(this.state.max_highDiff===diff[i][j])
          { 
            this.setState({d1:i,
                            d2:j})
            console.log(i+1,j+1)
          }
        
        console.log(d1,d2)
    }

    TestFunction(){
      //console.log(this.state.chartData,data)
      //console.log(data.filter(d=>(d.fields.Date)))
      
    }

    componentDidMount() {
      var that = this;
      const { navigation } = that.props;
      that.focusListener = navigation.addListener("didFocus", () => {
        // The screen is focused
        // Call getData
        that.getData().then(()=>that._profitCheck())
        
        //this.setState({chartData: this.state.data.records.sort((a,b)=>(a.fields.val>b.fields.val?1:-1)),})
        //console.log('chart data is :',this.state.chartData )
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
      that._profitCheck()
    }
  

      render(){
        
        let sampleData2 = [
          {x: '2019-01-01', y: 30},
          {x: '2019-01-02', y: 200},
          {x: '2019-01-03', y: 170},
          {x: '2019-01-04', y: 250},
          {x: '2019-01-05', y: 10}
      ]
      if(this.state.rCheck===false)return(
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
                <TouchableOpacity onPress={(i)=>{this.TestFunction()}}style={{marginTop:50}}>
                  <PureChart data={sampleData2} height={200}type='line' />
                </TouchableOpacity>
                <View style={styles.sectionRow}>
                    <Text style={styles.text}>Max Profit for 10 stocks</Text>
                    <Text style={styles.text}>Rs. {this.state.max_highDiff*10}</Text>
                </View>
                <View style={styles.sectionRow}>
                    <Text style={styles.text}>Buy Date: {this.state.d1+1} June</Text>
                    <Text style={styles.text}>Sell Date: {this.state.d2+1} June</Text>
                </View>
            </ScrollView>
        
          )
          else
          {
            return(<ActivityIndicator/>)
          }
      }
    }