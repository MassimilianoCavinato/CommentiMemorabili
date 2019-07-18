import React from 'react';
import { View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import TopNavigatorTabs from './TopNavigatorTabs';

export default class TopNavigator extends React.Component {

  constructor(props){
    super(props);
    // "Tabs", "PostDetail"
    this.state = {
      type: "Tabs",
      visible: true
    }
  }

  componentWillReceiveProps(props){

    this.setState({visible: props.visible});
  }

  onTabPress(tab) {
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
    console.log(this.state.visible, typeof this.state.visible);
    if(this.state.visible){
      return (
        <View style={{ backgroundColor: 'green', height: 40}}>
          <TopNavigatorTabs onTabPress={tab => this.onTabPress(tab)} />
        </View>
      )
    } else {
      return null;
    }
  }
}
