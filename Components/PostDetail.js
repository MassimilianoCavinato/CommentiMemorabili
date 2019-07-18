import React from 'react';
import shuffle from 'shuffle-array';
import {Text, Animated, View, Image, TouchableOpacity, FlatList, Animate, Easing } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import UpVotesCounter from './UpVotesCounter';
import DownVotesCounter from './DownVotesCounter';
import CommentsCounter from './CommentsCounter';
import Category from './Category';
import PostComment from './PostComment';
import ListSeparator_0 from './ListSeparator_0';
import * as COMMENTS from '../assets/COMMENTS.json';
import BannerSlim from './BannerSlim';

export default class PostItem extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      comments: [],
      animation: new Animated.Value(100)
    };
  }

  componentDidMount(){
    this.loadComments();
  }

  componentWillReceiveProps(){
    Animated.timing(this.state.animation, {
        toValue: 1000,
        duration: 0
    }).start();
    this.refs.commentList.scrollToOffset({offset: 0, animated: false});
    this.loadComments();
    this.setState({animation: new Animated.Value(320)});
  }

  setOffset(e){
    this.offset = e.nativeEvent.contentOffset.y;
  }

  expandSlider(e){
    let delta_offset = e.nativeEvent.contentOffset.y - this.offset;
    if(delta_offset >= 30){
      Animated.timing(this.state.animation, {
          toValue: 60,
          duration: 300
      }).start();
    }
  }

  reduceSlider(){
    Animated.timing(this.state.animation, {
        toValue: 320,
        duration: 300
    }).start();
  }

  loadComments(){
    let comments = COMMENTS.default.map(c => Object.assign({}, c, { profile_picture: 'https://picsum.photos/id/'+Math.floor(Math.random() * 301)+'/300/300' }))
    this.setState({comments: shuffle(comments)});
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 40}}>
        <Category categoryname={this.props.category} />
        <Text style={{fontWeight: 'bold', fontSize: 16, paddingLeft: 4 }}>{this.props.title}</Text>
        <Animated.View
          onMoveShouldSetResponder={() => this.reduceSlider()}
          style={{ height: this.state.animation }}
        >
          <ImageZoom
            cropWidth={this.props.width}
            cropHeight={320}
            imageWidth={this.props.width}
            imageHeight={320}
            style={{ backgroundColor: '#eee' }}
          >
            <Image
              style={{width: this.props.width, height: 320}}
              source={{ uri: this.props.media }}
              resizeMethod='scale'
              resizeMode='contain'
            />
          </ImageZoom>
        </Animated.View>
        <View  style={{flex: 1, backgroundColor: 'yellow' }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity onPress={this.props.showPrev}>
              <Icon size={44} color="gray" opacity={0.5} name={"arrow-left-drop-circle"} />
            </TouchableOpacity>
            <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <UpVotesCounter count={this.props.upvotes} style={{paddingRight: 20}}/>
              <CommentsCounter count={this.props.comments}/>
              <DownVotesCounter count={this.props.downvotes}/>
            </View>
            <TouchableOpacity onPress={this.props.showNext}>
              <Icon size={44} color="gray" opacity={0.5} name={"arrow-right-drop-circle"} />
            </TouchableOpacity>
          </View>
          <BannerSlim />
          <FlatList
            ref='commentList'
            onScrollBeginDrag={(e) => this.setOffset(e)}
            onScrollEndDrag={(e) => this.expandSlider(e)}
            ItemSeparatorComponent={() => <ListSeparator_0 />}
            data={this.state.comments}
            keyExtractor={(item, index) => item._id}
            renderItem={ ({item}) => {
              return <PostComment
                id={item._id}
                user={item.user}
                text={item.text}
                profilePic={item.profile_picture}
              />
            }}
          />
        </View>
      </View>
    )
  }
}
