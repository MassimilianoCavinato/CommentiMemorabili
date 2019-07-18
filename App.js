import React from 'react';
import {Animated, View, Text, ScrollView, List, FlatList, Image, Dimensions, AsyncStorage } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import PostDetail from './Components/PostDetail';
import PostItem from './Components/PostItem';
import TopNavigator from './Components/TopNavigator';
import ModalTab from './Components/ModalTab';
import * as POSTS from './assets/POSTS.json';
import { getUser } from './utils';
import UserImage from './Components/UserImage';
import ListSeparator_0 from './Components/ListSeparator_0';

export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      cursor: '',
      posts: [],
      viewType: 'items',
      postId: 0,
      modalTab: "Closed",
      scrollPos: 0,
      width: 0,
      height: 0,
      user: null
    }
  }

  componentWillMount() {
    getUser().then(user => console.log(user));
  }

  componentDidMount () {
    this.setState({posts: POSTS.default});
  }

  showPrev () {
   let curr_index = this.state.posts.findIndex(post => post._id === this.state.postId);
   if(curr_index !== 0){
    let prev_post = this.state.posts[curr_index - 1];
    this.showPostDetail(prev_post);
   }
  }

  showNext () {
    let curr_index = this.state.posts.findIndex(post => post._id === this.state.postId);
    if(curr_index < this.state.posts.length - 1){
      let next_post = this.state.posts[curr_index + 1];
      this.showPostDetail(next_post);
    }
  }

  showContent () {

    if(this.state.viewType == 'detail'){
      post = this.state.posts.find(post => post._id === this.state.postId);
      return (
        <PostDetail
          id={post._id}
          media={post.media}
          title={post.title}
          downvotes={post.downvotes}
          upvotes={post.upvotes}
          comments={post.comments}
          category={post.category}
          width={this.state.width}
          height={this.state.height}
          showPrev={() => this.showPrev()}
          showNext={() => this.showNext()}
      />
      );
    } else {
      return (
        <FlatList
          ref='_scrollView'
          data={this.state.posts}
          ItemSeparatorComponent={() => <ListSeparator_0 />}
          keyExtractor={(item, index) => item._id}
          renderItem={ ({item}) => (
            <PostItem
              id={item._id}
              media={item.media}
              title={item.title}
              downvotes={item.downvotes}
              upvotes={item.upvotes}
              comments={item.comments}
              category={item.category}
              showPostDetail={()=> this.showPostDetail(item)}
            />
          )}
        />
      );
    }
  }

  set_modalTab(modalTab) {
    this.setState({modalTab: modalTab});
  }

  showPostItems () {
    this.setState({viewType: 'items', modalTab: "Closed"});
  }

  showPostDetail (post) {
    Image.getSize(post.media, (srcWidth, srcHeight) => {
      let maxHeight = Dimensions.get('window').height;
      let maxWidth = Dimensions.get('window').width;
      let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
      let width = maxWidth;
      let height = srcHeight * ratio;
      this.setState({
        viewType: "detail",
        postId: post._id,
        modalTab: "Closed",
        height: height,
        width: width
      });
    }, error => {
      console.log('error:', error);
    });
  }


  render () {
    return (
      <View
        style={{ flex: 1, backgroundColor: '#ddd'}}
      >
        <View style={{
          backgroundColor: 'green',
          height: 24
        }}
        />
        <TopNavigator
          set_modalTab={modalTab => this.set_modalTab(modalTab)}
          showPostItems={() => this.showPostItems()}
        />
        {this.showContent()}
        <ModalTab set_modalTab={modalTab => this.set_modalTab(modalTab)} modalTab={this.state.modalTab} />
      </View>
    )
  }
}
