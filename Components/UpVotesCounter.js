import React from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import millify from 'millify';

export default class UpVotestCounter extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      count: this.props.count
    }
  }

  
  render() {
    return (
      <View style={{alignItems: 'center', flexDirection: 'row', padding: 4  }}>
        <Icon size={30} color="#aaa" name={"arrow-up-bold"} />
        <Text style={{fontSize: 14, fontWeight: 'bold', color:"#aaa" }}>{millify(this.state.count, {precision: 1})}</Text>
      </View>
    )
  }
}
