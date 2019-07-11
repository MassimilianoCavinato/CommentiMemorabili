import React, { Component } from 'react';
import { SocialIcon } from 'react-native-elements';

export default class LINKEDIN_LoginButton extends Component {
  
    constructor(props){
      super(props);
    }

    render() {
        return (
        <SocialIcon
            button
            raised
            type='linkedin'
            title="Login with Linkedin"
            onPress={() => console.log('logging linkedin')}
        />
        )
    }
}