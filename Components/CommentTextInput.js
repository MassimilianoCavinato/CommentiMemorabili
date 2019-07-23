import React from 'react';
import { TextInput } from 'react-native';

export default class CommentTextInput extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 4,
          margin: 2,
          top: this.state.textInputHeight,
          padding: 2,
          backgroundColor: 'white'
        }}
        keyboardAppearance='dark'
        placeholder='Scrivi ...'
        onFocus={()=>this.props.increaseTextInputHeight()}
        onBlur={()=>this.props.decreaseTextInputHeight()}
        returnKeyType="send"
      />
    )
  }
}
