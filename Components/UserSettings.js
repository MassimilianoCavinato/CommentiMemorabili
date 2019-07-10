// import React from 'react';
// import {Text, View } from 'react-native';
// import FBLoginButton from './FBLoginButton';


// export default class UserSettings extends React.Component {
//   constructor(props){
//     super(props);
//     this.height =  Dimensions.get('window').height - 56;
//   }

//   render() {
//     return (
//         <View style={{ 
//             position: 'absolute', 
//             zIndex: 1, 
//             flex: 1, 
//             backgroundColor: 'rgba(240, 255, 240, .95)', 
//             width: 350, 
//             height: this.height, 
//             padding: 16, 
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 1 },
//             shadowOpacity: 0.8,
//             shadowRadius: 5,  
//             elevation: 10
//         }}>
//         {this.props.isLogged ? <UserSettings /> :<FBLoginButton /> }
//         </View>
//     )
//   }
// }

