import React, { Component } from 'react';
import { SocialIcon } from 'react-native-elements';

export default class YOUTUBE_LoginButton extends Component {
  
    constructor(props){
      super(props);
    }

    render() {
        return (
        <SocialIcon
            button
            raised
            type='youtube'
            title="Login with Youtube"
            onPress={() => console.log('logging youtube')}
        />
        )
    }
}