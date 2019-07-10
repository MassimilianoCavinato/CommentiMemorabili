import React from 'react';
import { Text, View } from 'react-native';

export default class Category extends React.Component {
  
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View>
        <Text style={{fontSize: 12, paddingLeft: 4, color: '#bbb', fontWeight: 'bold', fontFamily: 'monospace'}}>{this.props.categoryname}</Text>
      </View>
    )
  }
}


