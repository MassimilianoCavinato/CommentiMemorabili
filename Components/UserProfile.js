
import RCTNetworking from 'RCTNetworking';
import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import FACEBOOK_LoginButton from './Login/FACEBOOK_LoginButton';
import GOOGLE_LoginButton from './Login/GOOGLE_LoginButton';
import INSTAGRAM_LoginButton from './Login/INSTAGRAM_LoginButton';
import COMMENTIMEMORABILI_LoginButton from './Login/COMMENTIMEMORABILI_LoginButton';
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
      loading: true,
      user: null
    }
  }

  componentDidMount(){
    RCTNetworking.clearCookies(()=>{});
    this.getUserInfo();
  }

  getUserInfo(){
    getUser()
    .then(user => {
      if(user){
        this.setState({loading: false, user: user})
      }
      else{
        this.setState({lading: false});
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
      console.log(user);
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

  showUserTab() {

    if(this.state.user === null){
      return (
        <View>
          <COMMENTIMEMORABILI_LoginButton setUserInfo={(userInfo) => this.setUserInfo(userInfo)} />
          <FACEBOOK_LoginButton setUserInfo={(userInfo) => this.setUserInfo(userInfo)}/>
          <GOOGLE_LoginButton setUserInfo={(userInfo) => this.setUserInfo(userInfo)}/>
          <INSTAGRAM_LoginButton setUserInfo={(userInfo) => this.setUserInfo(userInfo)}/>
        </View>
      )
    }
    else{
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white'}}>Ciao {this.state.user.username}</Text>
          <Image source={{uri: this.state.user.profile_picture}} style={{ width: 200, height: 200 }} />
          <Button title="Logout" onPress={() => this.unsetUserInfo()} />
        </View>
      )
    }
  }

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.95)'}}>
          {this.showUserTab()}
        </View>
    )
  }
}
