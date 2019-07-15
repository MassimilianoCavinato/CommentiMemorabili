import React from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default class CommentsCounter extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{alignItems: 'center', flexDirection: 'row', padding: 4 }}>
        <Icon size={20} color="#aaa" name={"comment"} style={{ marginRight: 4 }} />
        <Text style={{fontSize: 12,  color:"#aaa"}}>{this.props.count.toString()}</Text>
      </View>
    )
  }
}
