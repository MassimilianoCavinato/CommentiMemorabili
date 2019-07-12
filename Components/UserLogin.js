import React from 'react';
import FACEBOOK_LoginButton from './Social/FACEBOOK_LoginButton';
import GOOGLE_LoginButton from './Social/GOOGLE_LoginButton';
import INSTAGRAM_LoginButton from './Social/INSTAGRAM_LoginButton';
import { View, Text, TextInput } from 'react-native';

export default class UserLogin extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.25)' }}>
            <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18}}>
                {`Entra con il tuo account\nper accedere a features memorabili`}
            </Text>
            <TextInput
                 style={{
                    backgroundColor: 'white', 
                    height: 50,
                    margin: 8,
                    borderRadius: 25,
                    textAlign: 'center'
                }}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='white'
                onChangeText={(email) => this.setState({email})}
            />
            <TextInput
                style={{
                    backgroundColor: 'white', 
                    height: 50,
                    margin: 8,
                    borderRadius: 25,
                    textAlign: 'center'
                }}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='white'
                onChangeText={(password) => this.setState({password})}
            />
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 12, marginBottom: 12, marginLeft: 8, marginRight: 8 }}/>
            <FACEBOOK_LoginButton />
            <GOOGLE_LoginButton />
            <INSTAGRAM_LoginButton /> 
        </View>
    )
  }
}