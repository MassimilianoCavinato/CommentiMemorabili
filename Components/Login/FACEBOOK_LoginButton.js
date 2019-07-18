import React, { Component } from 'react';
import { SocialIcon } from 'react-native-elements';
import { Alert, View } from 'react-native';
import * as Facebook from 'expo-facebook';

export default class FACEBOOK_LoginButton extends Component {

  _handleFacebookLogin = async () => {
    this.props.onButtonPress("facebook_lgin");
    try {

      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  render() {
    return (
      <SocialIcon
          button
          raised
          type="facebook"
          title="Login with Facebook"
          onPress={this._handleFacebookLogin}
      />
    )
  }
}
