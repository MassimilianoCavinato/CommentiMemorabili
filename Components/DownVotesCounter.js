import React from 'react';
import { Text } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default class DownVotesCounter extends React.Component {
  
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Icon size={24} color="darkred" name="arrow-down-bold" style={{marginRight: 12}}>
        <Text>{this.props.count.toString()}</Text>
      </Icon>
    )
  }
}

