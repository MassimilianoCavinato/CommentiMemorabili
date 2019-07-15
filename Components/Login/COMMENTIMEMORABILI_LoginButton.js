import React, { Component } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

export default class COMMENTIMEMORABILI_LoginButton extends Component {

    constructor(props){
      super(props);
    }

    render() {
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              backgroundColor: 'green',
              height: 54,
              margin: 6,
              borderRadius: 25,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: "#000",
              shadowOffset: {
              	width: 0,
              	height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5
            }}
          >
            <Image
             source={require('../../assets/CM_logo.png')}
             style={{ height: 30, width: 30, marginRight: 8 }}
            />
            <Text style={{fontWeight: 'bold', color: 'white'}}>Login with Commenti</Text>
        </TouchableOpacity>
        )
    }
}
