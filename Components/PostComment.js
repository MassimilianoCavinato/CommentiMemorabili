import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UserImage from './UserImage';

export default class PostComment extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'top', padding: 4, borderWidth: 3, borderColor: 'red', margin: 4 }}>
        <UserImage size={60} circle uri={this.props.profilePic} />
        <View style={{ paddingLeft: 4, paddingRight: 58 }}>
          <Text style={{fontWeight: 'bold', fontSize: 20 }}>{this.props.user.name}</Text>
          <Text style={{fontSize: 16 }}>{this.props.text}</Text>
        </View>
      </View>
    )
  }
}
