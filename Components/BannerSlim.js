import React from 'react';
import { Text, View } from 'react-native';

export default class BannerSlim extends React.Component {
  
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{ height: 60, alignItems:'center', justifyContent:'center',  backgroundColor: 'red'}}>
        <Text style={{
            fontSize: 12,  
            fontWeight: 'bold', 
            textAlign: 'center',
            backgroundColor: 'yellow'
        }}>
            Reserved space for monetization
        </Text>
      </View>
    )
  }
}


