import React, {Component} from 'react'
import {Text,View, 
        TouchableOpacity,
        Image,
        FlatList,
        ScrollView} from 'react-native'

import styles from '../assets/style'
import StockDate from '../components/stockDate'

//TODO
// Top Panel height for scrollview
// Bottom Panel
import PureChart from 'react-native-pure-chart';

let sampleData = [
  {x: '2018-01-01', y: 30},
  {x: '2018-01-02', y: 200},
  {x: '2018-01-03', y: 170},
  {x: '2018-01-04', y: 250},
  {x: '2018-01-05', y: 10}
]

export default class Screen1 extends Component {
    constructor(props){
      console.log('Home-page')
      super(props)
      this.state={
        value:'100',
        dataSource: {},

  
      }
    }

    componentDidMount() {
      var that = this;
      let items = Array.apply(null, Array(30)).map((v, i) => {
        return { x: JSON.stringify(i), y: JSON.stringify(i*10) };
      });
      console.log(items)
      that.setState({
        //Setting the data source
        dataSource: items,

      });
      
    }

      render(){
          return(
            <ScrollView>
                <View style={styles.sectionContainer}>
              

                        <Text style={styles.sectionTitle}>Screen1</Text>

                
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item }) => (

                          <StockDate date={item.x} val={item.y}/>
                        )}
                        //Setting the number of column
                        numColumns={3}
                        keyExtractor={(item, index) => index}
                      />
                </View>
                <View style={{marginTop:50}}>
                  <PureChart data={sampleData} height={200}type='line' />
                </View>
            </ScrollView>
        
          )
      }
    }