import React from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default class UpVotestCounter extends React.Component {
  
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{alignItems: 'center', flexDirection: 'row', width: 80 }}>
        <Icon size={24} color="#aaa" name={"arrow-up-bold"} />
        <Text style={{fontSize: 12,  color:"#aaa" }}>{this.props.count.toString()}</Text>
      </View>
    )
  }
}