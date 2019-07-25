import React from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import millify from 'millify';

export default class CommentsCounter extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      count: this.props.count
    }
  }

  render() {
    return (
      <View style={{alignItems: 'center', flexDirection: 'row', padding: 4, paddingTop: 8 }}>
        <Icon size={24} color="#aaa" name={"comment"} style={{ marginRight: 4 }} />
        <Text style={{fontSize: 14, fontWeight: 'bold', color:"#aaa" }}>{millify(this.state.count, {precision: 1})}</Text>
      </View>
    )
  }
}
