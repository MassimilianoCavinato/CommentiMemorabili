import React from 'react';
import { View, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import TopNavigatorTabs from './TopNavigatorTabs';

export default class TopNavigator extends React.Component {

  constructor(props){
    super(props);
    // "Tabs", "PostDetail"
    this.state = {
      type: "Tabs",
    }
  }

  onTabPress(tab) {
    console.log(tab);
    if(tab === "Hot"){
      this.props.showPostItems();
    }
    else if(tab === "Account"){
      this.props.set_modalTab("Account");
    }
    else{
      this.props.set_modalTab("Account");
    }
  }


  render() {
    return (
      <View style={{
        position: "absolute",
        top: 24,
        left:4,
        right:4,
        zIndex:1,
        height: 36,
        backgroundColor: 'rgba(0,130,10,.98)',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16
      }}
      >
        <TopNavigatorTabs onTabPress={tab => this.onTabPress(tab)} />
      </View>
    )
  }
}
