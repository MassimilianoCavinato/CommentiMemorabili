import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UserImage from './UserImage';
export default class PostComment extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{margin: 2, borderRadius: 16 }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <UserImage radius={30} uri={this.props.profilePic} />
          <Text style={{fontWeight: 'bold', fontSize: 18, paddingLeft: 4 }}>{this.props.user.name}</Text>
        </View>
        <Text style={{fontSize: 16, paddingLeft: 8, }}>{this.props.text}</Text>
      </View>
    )
  }
}
