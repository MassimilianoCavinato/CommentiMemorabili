import React from 'react';
import { Text, View } from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

export default class BannerSlim extends React.Component {
  
  constructor(props){
    super(props)
  }

  render() {
    return (
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        testDeviceID="EMULATOR"
      />
    )
  }
}


