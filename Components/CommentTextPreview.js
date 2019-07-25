import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UserImage from './UserImage';

//get login info from async storage
export default class PostPreview extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: '',
      visible: false
    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <View
      style={{
        flexDirection: 'row',
        alignItems: 'top',
        padding: 4,
        borderWidth: 3,
        borderColor: 'red',
        position: 'absolute',
        left:10,
        right: 10,
        top: 60,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <UserImage radius={60} uri={'https://picsum.photos/id/'+Math.floor(Math.random() * 301)+'/300/300'} />
        <View style={{ paddingLeft: 4, paddingRight: 58 }}>
          <Text style={{fontWeight: 'bold', fontSize: 20 }}>{"Stocazzo"}</Text>
          <Text style={{fontSize: 16 }}>{this.state.text}</Text>
        </View>
      </View>
    )
  }
}
