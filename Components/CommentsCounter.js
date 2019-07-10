import React from 'react';
import { Text } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default class CommentsCounter extends React.Component {
  
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Icon size={24} color="dodgerblue" name={"comment"} style={{marginRight: 12}}> 
        <Text>{this.props.count.toString()}</Text>
      </Icon>
    )
  }
}

