import React from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

export default class BannerLarge extends React.Component {
  
  constructor(props){
    super(props)
  }

  render() {
    //real adUnitId: ca-app-pub-3940256099942544/630097811
    return (
      <View  style={{ justifyContent: 'center', alignItems: 'center' }}>
        <AdMobBanner
          bannerSize="mediumRectangle"
          adUnitID="ca-app-pub-3940256099942544/6300978111" 
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={(error) => {console.log(error)}} 
        />
      </View>
    )
  }
}



