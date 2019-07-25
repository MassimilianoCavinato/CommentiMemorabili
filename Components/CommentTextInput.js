import React from 'react';
import { TextInput } from 'react-native';

export default class CommentTextInput extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: '',
      position: "bottom" //"top"
    };
  }

  moveUp(){
    if(this.state.position == "bottom"){
      this.setState({position: 'top'});
    }
  }
  
  moveDown(){
    if(this.state.position == "top"){
      this.setState({position: 'bottom'});
    }
  }

  _handle_onSubmitEditing(){
    let text = this.state.text;
    this.props.submitComment(text);
    this.setState({text: '', position: 'bottom'});
  }

  render() {
    return (
      <TextInput
        ref="CommentTextInput"
        maxLength={150}
        autogrow={true}
        mulitline={true}
        style={{
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: this.state.position === "bottom" ? 4 : 220,
          padding: 8,
          zIndex: 3,
          borderColor: 'red',
          borderWidth: 1,
          borderRadius: 2,
          backgroundColor: 'rgba(255,255,255,.95)',
          shadowColor: "black",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 5
        }}
        value={this.state.text}
        keyboardAppearance='dark'
        placeholder='Scrivi ...'
        onChangeText={(text) => this.setState({text: text})}
        onFocus={()=>this.moveUp()}
        onBlur={()=>this.moveDown()}
        onSubmitEditing={()=>this._handle_onSubmitEditing()}
        returnKeyType="send"
      />
    )
  }
}
