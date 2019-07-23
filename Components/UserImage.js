import React from 'react';
import { Image } from 'react-native';

export default class UserImage extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Image
        style={{
          width: this.props.radius,
          height: this.props.radius,
          // borderRadius: this.props.radius/2,
        }}
        source={{ uri: this.props.uri }}
      />
    )
  }
}
