import React from 'react';
import { View, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';


export default class TopNavigator extends React.Component {
  constructor(props){
    super(props);
  }

  onTabPress(tab) {
    if(tab === "Hot"){
      this.props.showPostItems();
      Dimensions.get('window').width;
    }
    else{
      this.props.set_modalTab(tab);
    }
  }

  render() {
    return (
      <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', backgroundColor: 'green', position: 'absolute', paddingTop: 24, top: 0, width: Dimensions.get('window').width, zIndex:10}}>
        <Icon size={24} color="white" name={'flash-circle'} onPress={()=>this.onTabPress('Hot')}/>
        <Icon size={24} color="white" name={'account'}  onPress={()=>this.onTabPress('User')}/>
      </View>
    )
  }
}
