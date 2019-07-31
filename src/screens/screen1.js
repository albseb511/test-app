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

import store from '../redux/configureStore'
import {Provider} from 'react-redux'
import reducer from '../redux/reducer'
import {refreshPageEnd} from '../redux/action'

import { LineChart, Grid, YAxis } from 'react-native-svg-charts'
//TODO
//Redux 
//Logic - keep rCheck on flatlist, and call toRefresh
// dispatch rCheck to true everytime when you require refresh.

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
        instances:0,
        rCheck:true
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
          rCheck:false //Changed to redux
        }, function(){
          //this.setState({chartData: this.state.data})
          
        });
        try{
          console.log('start of try to dispatch')
          store.dispatch(refreshPageEnd())
        }catch(err){
          console.log('error reducer'+err)
        }

      })
      .catch((error) =>{
        console.error(error);
      });
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

      //Fill diff array and also create array with date and value.
      for(let i=0;i<len-1;i++){
        diff[i]= Array(len).fill(0)
        switch(i){
          case len-2:{cDataT.push({x:this.state.data[i+1].fields.Date,y:Number.isNaN(parseInt(this.state.data[i+1].fields.Value))?null:this.state.data[i].fields.Value})}
          default:{cDataT.push({x:this.state.data[i].fields.Date,y:Number.isNaN(parseInt(this.state.data[i].fields.Value))?null:this.state.data[i].fields.Value})}
          
      }
      }
      console.log(cDataT,typeof(cDataT))
      //chartArray = Array(cDataT).map((item) => item.x)

      //map the data into Array for chart 
      chartArray = cDataT.filter(a=>a.y!='').map((a)=>a.y!=null?parseInt(a.y):{})
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


    listenerHandler=()=>{
      console.log('listener redux')
      if(store.getState().test==='end')
        console.log('listener end')
      else if(store.getState().test==='start'){
        console.log('listener start')
        this.toRefresh()
      }
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

    toRefresh=()=>{
      //Need to be called from child component
      //To refresh
      console.log('reduxRefresh')
      this.getData().then(()=>this._profitCheck())
      //store.dispatch(refreshPageEnd({rCheck:false}))

    }
  

      render(){
         
      
      if(this.state.rCheck===false)return(
        <Provider store={store}>
            <ScrollView>
                <View style={styles.sectionContainer}>
              

                        <Text style={styles.sectionTitle}>Screen1</Text>

                
                    <FlatList
                        data={this.state.data}
                        refreshing={this.state.rCheck}
                        onRefresh={()=>this.toRefresh}
                        renderItem={({ item }) => (

                          <StockDate date={item.fields.Date} 
                                      val={item.fields.Value} 
                                      id={item.id} 
                                      data={item}/>
                        )}
                        //Setting the number of column
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                      />

                </View>
                <TouchableOpacity onPress={()=>{}}style={{marginTop:50,height: 200, flexDirection: 'row' }}>
                        <YAxis
                            data={chartArray}
                            contentInset={{top:20,bottom:20}}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            numberOfTicks={10}
                            formatLabel={(value) => `Rs.${value}`}
                             />
                        <LineChart
                                  style={{ flex:1, height: 200, marginLeft:20 }}
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
                
                <View style={styles.sectionRow}>
                    <Text style={styles.text}>Start Date: {this.state.data[0].fields.Date}</Text>
                    <Text style={styles.text}>End Date: {this.state.data[this.state.data.length-1].fields.Date}</Text>
                    <Text style={styles.text}>Redux: {store.subscribe(this.listenerHandler)}</Text>
                </View>
                
                <TouchableOpacity style={styles.btn} onPress={()=>this.toRefresh()}>
                  <Text>REFRESH</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={()=>store.dispatch(refreshPageEnd())}>
                  <Text>CHANGE REDUX STATE</Text>
                </TouchableOpacity>
            </ScrollView>
        </Provider>
          )
          else
          {
            return(<View style={styles.sectionContainer}>
                    <ActivityIndicator/>
                  </View>)
          }
      }
    }

    //export default connect()(Screen1)