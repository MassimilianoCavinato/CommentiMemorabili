import React from 'react';
import {Text, View, Image, TouchableHighlight } from 'react-native';
import UpVotesCounter from './UpVotesCounter';
import DownVotesCounter from './DownVotesCounter';
import CommentsCounter from './CommentsCounter';
import Category from './Category';

export default class PostItem extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff', marginBottom: 16, flex: 1}}>
        <Category categoryname={this.props.category} />
        <Text style={{fontWeight: 'bold', fontSize: 22, paddingLeft: 4 }}>{this.props.title}</Text>
        <TouchableHighlight onPress={this.props.showPostDetail} style={{backgroundColor: '#444'}}>
          <Image  style={{ width: 'auto', height: 450 }}  
            source={{ uri: this.props.media }}
            resizeMode='contain'
          />
        </TouchableHighlight>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <UpVotesCounter count={this.props.upvotes} style={{paddingRight: 20}}/> 
          <DownVotesCounter count={this.props.downvotes}/>
          <CommentsCounter count={this.props.comments}/>
        </View>
      </View>
    )
  }
}

