import React, { Component } from 'react';
import { SocialIcon } from 'react-native-elements';

export default class GOOGLE_LoginButton extends Component {

    constructor(props){
      super(props);
    }

    // signIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log({userInfo});
    //         this.setState({ userInfo });
    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation (f.e. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         // play services not available or outdated
    //         } else {
    //         // some other error happened
    //         }
    //     }
    // }


    render() {
        return (
        <SocialIcon
            button
            raised
            type='google-plus-official'
            title="Login with Google"
            onPress={() => console.log(1)}
        />
        )
    }
}
