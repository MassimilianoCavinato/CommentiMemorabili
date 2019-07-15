import React from 'react';
import FACEBOOK_LoginButton from './Login/FACEBOOK_LoginButton';
import GOOGLE_LoginButton from './Login/GOOGLE_LoginButton';
import INSTAGRAM_LoginButton from './Login/INSTAGRAM_LoginButton';
import COMMENTIMEMORABILI_LoginButton from './Login/COMMENTIMEMORABILI_LoginButton';
import { View, Text, Image, Button } from 'react-native';
import { getUser, setUser, unsetUser } from '../utils';

export default class UserTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
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

  showUserTab() {
    if(this.state.user === null){
      return (
        <View>
          <COMMENTIMEMORABILI_LoginButton setUserInfo={(userInfo) => this.setUserInfo(userInfo)} />
          <FACEBOOK_LoginButton  setUserInfo={(userInfo) => this.setUserInfo(userInfo)}/>
          <GOOGLE_LoginButton  setUserInfo={(userInfo) => this.setUserInfo(userInfo)}/>
          <INSTAGRAM_LoginButton  setUserInfo={(userInfo) => this.setUserInfo(userInfo)}/>
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
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.25)' }}>
          {this.showUserTab()}
        </View>
    )
  }
}
