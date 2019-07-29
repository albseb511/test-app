import React, {Component} from 'react'
import {Text,View, 
        TouchableOpacity,
        Alert,
        FlatList,
        ScrollView,
        ActivityIndicator} from 'react-native'

import styles from '../assets/style'
import StockDate from '../components/stockDate'

import { withNavigation } from "react-navigation";

import { LineChart, Grid } from 'react-native-svg-charts'
//TODO
// Need to pass function as prop to child component stockDate. 
// Remove the button component and bring it inside the main view.
// Bottom Panel - 
// Map Purechart with data / HighCharts / D3
// Multiple scenarios?

let chartArray=[]
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
        max_highDiff:0,
        instances:0
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
          //this.setState({chartData: this.state.data})
          
        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }

 

    onRef(){
      this.setState({rCheck:true})

    }

    //START OF PROFIT CHECK 
    // Checks max profit, date values,
    _profitCheck=()=>{
      console.log('profit check called')
      let len = this.state.data.length
      let diff = Array(len-1).fill(0)
      //let cDataX = Array(len).fill('')
      //let cDataY = Array(len).fill('')
      let cDataT = []
      for(let i=0;i<len-1;i++){
        diff[i]= Array(len).fill(0)
        switch(i){
          case len-2:{cDataT.push({x:this.state.data[i+1].fields.Date,y:Number.isNaN(parseInt(this.state.data[i+1].fields.Value))?null:this.state.data[i].fields.Value})}
          default:{cDataT.push({x:this.state.data[i].fields.Date,y:Number.isNaN(parseInt(this.state.data[i].fields.Value))?null:this.state.data[i].fields.Value})}
          
      }
      }
      console.log(cDataT,typeof(cDataT))
      //chartArray = Array(cDataT).map((item) => item.x)
      chartArray = cDataT.map((a)=>a.y!=null?parseInt(a.y):'')
      console.log(chartArray,typeof(chartArray))

        for(let i=0;i<len-1;i++){
          for(let j=i+1;j<len;j++){
            diff[i][j]= parseInt(this.state.data[j].fields.Value)-parseInt(this.state.data[i].fields.Value)
            if(Number.isNaN(diff[i][j]))
            {
              diff[i][j]=''
              //console.log(i,j)
            }
          }
          
        }
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
                            d2:j,
                          instances:this.state.instances+1})
            console.log(i+1,j+1)
          }
    }
    //END OF PROFIT CHECK


    TestFunction(){
      //console.log(this.state.chartData,data)
      //console.log(data.filter(d=>(d.fields.Date)))
      
    }

    componentDidMount() {
      console.log(chartArray)
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

    onDel(a){
      //Need to be called from child component
      //To refresh
      console.log('refresh called onDel')
      this.setState({rCheck:true})
      this.getData().then(()=>this._profitCheck())
      this.setState({rCheck:false})
      return a=1
    }
  

      render(){
        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
      
      if(this.state.rCheck===false)return(
            <ScrollView>
                <View style={styles.sectionContainer}>
              

                        <Text style={styles.sectionTitle}>Screen1</Text>

                
                    <FlatList
                        data={this.state.data}
                        refreshing={this.state.rCheck}
                        onRefresh={()=>this.onDel}
                        renderItem={({ item }) => (

                          <StockDate date={item.fields.Date} 
                                      val={item.fields.Value} 
                                      id={item.id} 
                                      data={item}
                                      updateFunction={this.onRef}/>
                        )}
                        //Setting the number of column
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                      />
                </View>
                <TouchableOpacity onPress={()=>{}}style={{marginTop:50}}>
                        <LineChart
                                  style={{ height: 200 }}
                                  data={chartArray}
                                  svg={{ stroke: 'rgb(134, 65, 244)' }}
                                  contentInset={{ top: 20, bottom: 20 }}
                                    >
                          <Grid />
                        </LineChart>
                </TouchableOpacity>
                <View style={styles.sectionRow}>
                    <Text style={styles.text}>Max Profit for 10 stocks</Text>
                    <Text style={styles.text}>Rs. {this.state.max_highDiff*10}</Text>
                </View>
                <View style={styles.sectionRow}>
                    <Text style={styles.text}>Buy Date: {this.state.data[this.state.d1].fields.Date}</Text>
                    <Text style={styles.text}>Sell Date: {this.state.data[this.state.d2].fields.Date}</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=>this.onDel()}>
                  <Text>REFRESH</Text>
                </TouchableOpacity>
            </ScrollView>
        
          )
          else
          {
            return(<View style={styles.sectionContainer}>
                    <ActivityIndicator/>
                  </View>)
          }
      }
    }