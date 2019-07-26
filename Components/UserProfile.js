
import RCTNetworking from 'RCTNetworking';
import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import FACEBOOK_LoginButton from './Login/FACEBOOK_LoginButton';
import GOOGLE_LoginButton from './Login/GOOGLE_LoginButton';
import INSTAGRAM_LoginButton from './Login/INSTAGRAM_LoginButton';
import COMMENTIMEMORABILI_LoginButton from './Login/COMMENTIMEMORABILI_LoginButton';
import UserImage from './UserImage';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { getUser, setUser, unsetUser } from '../utils';


export default class UserProfile extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profilo Utente',
      headerBackTitle: 'Torna',
      headerStyle: {
        backgroundColor: 'green',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }

  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount(){
    this.getUserInfo();
  }

  getUserInfo(){
    getUser()
    .then(user => {
      if(user){
        this.setState({user: user})
      }
      else{
        this.setState({user: null})
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  setUserInfo(userInfo) {
    console.log("SETTING USER INFO IN ASYNC STORAGE");
    console.log(userInfo);
    setUser(userInfo)
    .then(() => {
      return getUser();
    })
    .then(user => {
      if(user){
        this.setState({loading: false, user: user})
      }
      else{
        this.setState({lading: false, user: null});
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  unsetUserInfo(){
    unsetUser()
    .then(() => {
      this.setState({user: null});
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    if(this.state.user === null){
      return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.95)'}}>
          <COMMENTIMEMORABILI_LoginButton setUserInfo={(userInfo) => this.setUserInfo(userInfo)} />
          <FACEBOOK_LoginButton setUserInfo={(userInfo) => this.setUserInfo(userInfo)}/>
          <GOOGLE_LoginButton setUserInfo={(userInfo) => this.setUserInfo(userInfo)}/>
          <INSTAGRAM_LoginButton setUserInfo={(userInfo) => this.setUserInfo(userInfo)}/>
        </View>
      )
    }
    else{
      return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,.95)',
          paddingTop: 24
        }}>
          <UserImage size={90}  uri={this.state.user.profile_picture} />
          <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', marginTop: 8}}>{this.state.user.username}</Text>
          <TouchableOpacity
            onPress={() => this.unsetUserInfo()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'gray',
              padding: 8,
              borderRadius: 25,
              shadowColor: "#000",
              shadowOffset: {
              	width: 0,
              	height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              position: 'absolute',
              bottom: 50

            }}
          >
          <Text style={{color: 'white'}}>
            Sconnetti
          </Text>
          <Icon size={12} color="white" name={'close'} style={{marginLeft: 4}}/>
         </TouchableOpacity>

        </View>
      )
    }
  }
}
