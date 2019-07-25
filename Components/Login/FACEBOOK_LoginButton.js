import React, { Component } from 'react';
import { SocialIcon } from 'react-native-elements';
import { Alert, View } from 'react-native';
import * as Facebook from 'expo-facebook';
export default class FACEBOOK_LoginButton extends Component {

  constructor(){
    super();
  }


  getUserInfo = async () => {
    try {

      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with your own app id in standalone app
        { permissions: ['instagram_basic'] }
      );
      console.log(type)
      switch (type) {
        case 'success': {

          let response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,short_name,picture`);
          let profile = await response.json();

          let userInfo = {
              id: profile.id,
              platform: "facebook",
              token: token,
              username: profile.short_name,
              full_name: profile.first_name+ " " + profile.last_name,
              profile_picture: profile.picture.data.url
          }

          this.props.setUserInfo(userInfo);
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
          onPress={this.getUserInfo}
      />
    )
  }
}
