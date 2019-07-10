import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default class PostComment extends React.Component {
  
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{margin: 2, borderRadius: 16 }}>
        <LinearGradient
          colors={['#3D8C1C', '#50B426']}
          start={[0,0]}
          end={[1,1]}
          style={{ padding: 4, borderRadius: 4 }}
        >
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>{this.props.user.name}</Text>
          <Text style={{fontSize: 16, color: 'white', paddingLeft: 4 }}>{this.props.text}</Text>
        </LinearGradient>
      </View>
    )
  }
}

