import React from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default class UpVotestCounter extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{alignItems: 'center', flexDirection: 'row', padding: 4  }}>
        <Icon size={30} color="#aaa" name={"arrow-up-bold"} />
        <Text style={{fontSize: 20, fontWeight: 'bold', color:"#aaa" }}>{this.props.count.toString()}</Text>
      </View>
    )
  }
}
