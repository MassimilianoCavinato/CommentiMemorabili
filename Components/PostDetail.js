import React from 'react';
import shuffle from 'shuffle-array';
import {Text, View, Image, Dimensions, TouchableOpacity, VirtualizedList } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import UpVotesCounter from './UpVotesCounter';
import DownVotesCounter from './DownVotesCounter';
import CommentsCounter from './CommentsCounter';
import Category from './Category';
import PostComment from './PostComment';
import * as COMMENTS from '../assets/COMMENTS.json';

export default class PostItem extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      comments: []
    };
  }

  componentDidMount(){
    this.loadComments();
  }

  componentWillReceiveProps(){
    this.loadComments();
  }
  loadComments(){
    this.setState({comments: shuffle(COMMENTS.default)});
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Category categoryname={this.props.category} />
        <Text style={{fontWeight: 'bold', fontSize: 16, paddingLeft: 4 }}>{this.props.title}</Text>
        <ImageZoom
          cropWidth={this.props.width}
          cropHeight={380}
          imageWidth={this.props.width}
          imageHeight={380}
          style={{ backgroundColor: '#444' }}
        >
          <Image
            style={{width: this.props.width, height: 380}}
            source={{ uri: this.props.media }}
            resizeMethod='scale'
            resizeMode='contain'
          />
        </ImageZoom>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={this.props.showPrev}>
            <Icon size={44} color="gray" opacity={0.5} name={"arrow-left-drop-circle"} />
          </TouchableOpacity>
          <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <UpVotesCounter count={this.props.upvotes} style={{paddingRight: 20}}/>
            <DownVotesCounter count={this.props.downvotes}/>
            <CommentsCounter count={this.props.comments}/>
          </View>
          <TouchableOpacity onPress={this.props.showNext}>
            <Icon size={44} color="gray" opacity={0.5} name={"arrow-right-drop-circle"} />
          </TouchableOpacity>
        </View>
        <VirtualizedList
          data={this.state.comments}
          getItem={(data, index) => data[index]}
          getItemCount={data => data.length}
          keyExtractor={(item, index) => item._id}
          initialNumToRender={1}
          renderItem={ function({item}) {
            return <PostComment
              id={item._id}
              user={item.user}
              text={item.text}
            />
          }}
        />
      </View>
    )
  }
}
