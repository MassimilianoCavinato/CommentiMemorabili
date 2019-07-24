
import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { View, Text, Button } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default class View_A extends React.Component {

  static navigationOptions = ({ navigation }) => {

    return {
      title: 'Memorabili',
      headerStyle: {
        backgroundColor: 'green',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <Icon size={32} color="white" name={'account'} onPress={()=>navigation.navigate('UserProfile')}/>
      )
    }
  }

  componentDidMount(){
    console.log("Mounted A");
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lime' }}>
        <Text>A</Text>

      </View>
    );
  }
}
