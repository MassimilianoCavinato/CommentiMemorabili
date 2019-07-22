import React from 'react';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

export default class BannerLarge extends React.Component {
  
  constructor(props){
    super(props)
  }

  render() {
    return (
      <AdMobBanner
        bannerSize="mediumRectangle"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        testDeviceID="EMULATOR"
      />
    )
  }
}



