import React, {Component} from 'react'
import {Text,View, 
        TouchableOpacity,
        Image,
        FlatList,
        ScrollView} from 'react-native'

import styles from '../assets/style'
import StockDate from '../components/stockDate'

//TODO
// Top Panel
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
        data:{}

  
      }
    }
    
    getData() {
      return fetch('https://api.airtable.com/v0/appYgCzT4je4lJQUb/TestTable?api_key=keyxjWTbfhVKdNIva')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        
        this.setState({
          data: responseJson.records.sort((a,b)=>(a.fields.Date>b.fields.Date?1:-1)),
        }, function(){
          
        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }


    componentDidMount() {
      var that = this;
      that.getData()

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
                        renderItem={({ item }) => (

                          <StockDate date={item.fields.Date} val={item.fields.Value} id={item.id} data={item}/>
                        )}
                        //Setting the number of column
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                      />
                </View>
                <TouchableOpacity onPress={()=>console.log(this.state.data)}style={{marginTop:50}}>
                  <PureChart data={sampleData2} height={200}type='line' />
                </TouchableOpacity>
            </ScrollView>
        
          )
      }
    }