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
        return { id: i, val: (i*10) };
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
              
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen2',
                                                                                  {val:this.state.value})
                                                    console.log('Navigating to screen 2...')}}>
                        <Text style={styles.sectionTitle}>Screen1</Text>
                    </TouchableOpacity>  
                
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item }) => (

                          <StockDate date={item.id} val={item.val}/>
                        )}
                        //Setting the number of column
                        numColumns={3}
                        keyExtractor={(item, index) => index}
                      />
                </View>


            </ScrollView>
        
          )
      }
    }