import React, { Component } from 'react';
import { SocialIcon } from 'react-native-elements';

export default class Google_LoginButton extends Component {
  
    constructor(props){
      super(props);
    }

    render() {
        return (
        <SocialIcon
            button
            raised
            type='google-plus-official'
            title="Login with Google"
            onPress={() => console.log('logging google')}
        />
        )
    }
}
