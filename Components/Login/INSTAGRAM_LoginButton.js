import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import InstagramLogin from 'react-native-instagram-login';
import axios from 'axios';

export default class INSTAGRAM_LoginButton extends Component {

    constructor(props){
      super(props);
    }

    getUserInfo(token) {
        axios({
            method: 'GET',
            url: "https://api.instagram.com/v1/users/self/?access_token="+token,
        })
        .then(response => {
            let data = response.data.data;
            let userInfo = JSON.stringify({
                platform: "instagram",
                token: token,
                id: data.id,
                username: data.username,
                full_name: data.full_name,
                profile_picture: data.profile_picture
            });
            this.props.setUserInfo(userInfo);
        })
        .catch(error => {
            console.log(error);
        });
    }

    onPress() {
      this.props.onButtonPress();
      this.refs.instagramLogin.show();
    }


    render() {
        return (
            <View>
                <SocialIcon
                    button
                    raised
                    type='instagram'
                    title="Login with Instagram"
                    onPress={()=> {
                      this.props.onButtonPress('instagram_login');
                      this.refs.instagramLogin.show();
                    }}
                />
                <InstagramLogin
                    ref='instagramLogin'
                    clientId='4ecf8d9848b248d39c7c53c3bd7d84ad'
                    redirectUrl='http://instagram.com'
                    scopes={['public_content']}
                    onLoginSuccess={ (token) => {
                      this.props.onButtonPress('instagram_login_close');
                      this.getUserInfo(token);
                    }}
                    onClose={()=>this.props.onButtonPress('instagram_login_close')}
                    onLoginFailure={(data) => this.props.onButtonPress('instagram_login_close')}
                />
            </View>
        )
    }
}
