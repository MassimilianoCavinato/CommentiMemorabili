import React from 'react';
import { View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default class TopNavigatorTabs extends React.Component {

  constructor(props){
    super(props);
    //HOT - USER
  }

  render() {
    return (
      <View style={{
        flex: 1,
        width: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        
      }}>
        <Icon size={32} color="white" name={'flash-circle'} onPress={()=>this.props.onTabPress('Hot')}/>
        <Icon size={32} color="white" name={'account'} onPress={()=>this.props.onTabPress('Account')}/>
      </View>
    )
  }
}
