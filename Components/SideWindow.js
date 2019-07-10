import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import FBLoginButton from './FBLoginButton';


export default class SideWindow extends React.Component {
  constructor(props){
    super(props);
    this.height =  Dimensions.get('window').height - 56;
  }

  render() {
    return (
        <View style={{ 
            position: 'absolute', 
            zIndex: 1, 
            flex: 1, 
            backgroundColor: 'rgba(250, 255, 250, .95)', 
            width: 350, 
            height: this.height, 
            padding: 48, 
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 5,  
            elevation: 10
        }}
        >
        <Text style={{color: 'black', fontSize: 16, fontFamily: 'Roboto'}}>Registrati o entra con il tuo social preferito per accedere alla sezione commenti e molto altro ancora</Text>
        <View style={{backgroundColor: '#A2A2A2', height: 2, width: 'auto' }} />
        <FBLoginButton /> 
      
      </View>
    )
  }
}

