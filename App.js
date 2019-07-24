import React from 'react';
import View_A from './Components/View_A';
import UserProfile from './Components/UserProfile';
import VerticalScroll from './Components/VerticalScroll';
import HorizontalScroll from './Components/HorizontalScroll';
import { View, Text } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import BannerSlim from './Components/BannerSlim';
const AppNavigator = createStackNavigator({
  VerticalScroll: VerticalScroll,
  HorizontalScroll: HorizontalScroll,
  UserProfile: UserProfile,
},
{
  initialRouteName: "VerticalScroll"
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <AppContainer/>
        <BannerSlim />
      </View>
    )
  }
}
