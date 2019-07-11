import React, { Component } from 'react';
import { SocialIcon } from 'react-native-elements';

export default class INSTAGRAM_LoginButton extends Component {
  
    constructor(props){
      super(props);
    }

    render() {
        return (
        <SocialIcon
            button
            raised
            type='instagram'
            title="Login with Instagram"
            onPress={() => console.log('logging instagram')}
        />
        )
    }
}