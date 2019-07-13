import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import FACEBOOK_LoginButton from './Social/FACEBOOK_LoginButton';
import GOOGLE_LoginButton from './Social/GOOGLE_LoginButton';
import INSTAGRAM_LoginButton from './Social/INSTAGRAM_LoginButton';
import LINKEDIN_LoginButton from './Social/LINKEDIN_LoginButton';
import TWITCH_LoginButton from './Social/TWITCH_LoginButton';
import YOUTUBE_LoginButton from './Social/YOUTUBE_LoginButton';

export default class TabBottom extends React.Component {
  constructor(props){
    super(props);
    this.height =  Dimensions.get('window').height - 250;
    this.width =  Dimensions.get('window').width;
  }

  render() {
    return (
      <View style={{
        flexDirection: 'column',
        backgroundColor: 'rgba(250, 255, 250, .95)',
        width: this.width,
        height: 400,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 10
      }}
      >
        <FACEBOOK_LoginButton />
        <GOOGLE_LoginButton />
        <INSTAGRAM_LoginButton />
        <LINKEDIN_LoginButton />
        <TWITCH_LoginButton />
        <YOUTUBE_LoginButton />
      </View>
    )
  }
}
