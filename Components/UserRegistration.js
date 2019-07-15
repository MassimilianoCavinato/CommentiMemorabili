import React from 'react';

import { View, Text, TextInput } from 'react-native';

export default class UserRegistration extends React.Component {
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
        </View>
    )
  }
}
