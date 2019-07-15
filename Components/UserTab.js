import React from 'react';
import FACEBOOK_LoginButton from './Login/FACEBOOK_LoginButton';
import GOOGLE_LoginButton from './Login/GOOGLE_LoginButton';
import INSTAGRAM_LoginButton from './Login/INSTAGRAM_LoginButton';
import COMMENTIMEMORABILI_LoginButton from './Login/COMMENTIMEMORABILI_LoginButton';
import { View, Text, TextInput } from 'react-native';

export default class UserTab extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.25)' }}>
            <COMMENTIMEMORABILI_LoginButton />
            <FACEBOOK_LoginButton />
            <GOOGLE_LoginButton />
            <INSTAGRAM_LoginButton />
        </View>
    )
  }
}
