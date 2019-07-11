import React, { Component } from 'react';
import { SocialIcon } from 'react-native-elements';

export default class TWITCH_LoginButton extends Component {
  
    constructor(props){
      super(props);
    }

    render() {
        return (
        <SocialIcon
            button
            raised
            type='twitch'
            title="Login with Twitch"
            onPress={() => console.log('logging twitch')}
        />
        )
    }
}