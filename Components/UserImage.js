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
          width: this.props.size,
          height: this.props.size,
          borderRadius: this.props.circle ? this.props.size/2 : 0
        }}
        source={{ uri: this.props.uri }}
      />
    )
  }
}
