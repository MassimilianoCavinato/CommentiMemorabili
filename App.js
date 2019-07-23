import React from 'react';
import shuffle from 'shuffle-array';
import { View, VirtualizedList, Image, Dimensions, TextInput } from 'react-native';
import PostDetail from './Components/PostDetail';
import PostItem from './Components/PostItem';
import TopNavigator from './Components/TopNavigator';
import ModalTab from './Components/ModalTab';
import * as POSTS from './assets/POSTS.json';

import { getUser } from './utils';
import ListSeparator_0 from './Components/ListSeparator_0';
import BannerSlim from './Components/BannerSlim';

export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      cursor: '',
      posts: [],
      horizontal: false,
      viewType: 'item',
      postId: -1,
      modalTab: "Closed",
      scrollPos: 0,
      width: 0,
      height: 0,
      user: null,
      navigator: true,
    }

    // this._onViewableItemsChanged = ({ viewableItems, changed }) => {
    //   // if(this.state.viewType === 'detail'){
    //   //
    //   // }
    // };
    //
    // this._viewabilityConfig = {
    //   itemVisiblePercentThreshold: 50
    // };
  }

  componentWillMount() {
    getUser().then(user => console.log(user));
  }

  componentDidMount () {
    this.loadPosts();
  }

  shouldItemUpdate(update){
    console.log(update);
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
          switchToVertical={() => this.switchToVertical()}
          visible={this.state.navigator}
        />
        <VirtualizedList
          style={{ flex: 1 }}
          ref='_scrollView'
          data={this.state.posts}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          keyExtractor={(item) => item._id}
          initialNumToRender={5}
          windowSize={11}
          ItemSeparatorComponent={() => this.state.horizontal === true ? null : <ListSeparator_0 />}
          onScrollBeginDrag={(e) => this.setOffset(e)}
          onScrollEndDrag={(e) => this.handle_ScrollEndDrag(e)}
          horizontal={this.state.horizontal}
          pagingEnabled={this.state.horizontal}
          renderItem={ ({item, index}) => {
            return (
              <PostDetail
                horizontal={this.state.horizontal}
                selected={this.state.postId === item._id}
                id={item._id}
                index={index}
                media={item.media}
                title={item.title}
                downvotes={item.downvotes}
                upvotes={item.upvotes}
                comments={item.comments}
                category={item.category}
                srcWidth={item.srcWidth}
                srcHeight={item.srcHeight}
                switchToHorizontal={()=> this.switchToHorizontal()}
              />
            );
          }}
        />
        {this.renderTextInput()}
        <BannerSlim />
        <ModalTab set_modalTab={modalTab => this.set_modalTab(modalTab)} modalTab={this.state.modalTab} />
      </View>
    )
  }

  loadPosts(){
    let posts = require('./assets/POSTS.json');
    let promises = posts.map(post => {
      return new Promise((resolve, reject) => {
        Image.getSize(post.media, (srcWidth, srcHeight) => {
          resolve({
            srcWidth: srcWidth,
            srcHeight: srcHeight
          });
        });
      });
    });

    Promise.all(promises)
    .then(sizes => {
      posts = posts.map((post, index) => {
        return Object.assign({}, post, {
          srcWidth: sizes[index].srcWidth,
          srcHeight: sizes[index].srcHeight
        });
      });

      this.setState({
        posts: posts
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  setOffset(e){
    this.offset = e.nativeEvent.contentOffset.y;
  }

  handle_ScrollEndDrag(e){
    let delta_offset = e.nativeEvent.contentOffset.y - this.offset;
    if(this.offset >  300){
      if(delta_offset <= -100 && this.state.navigator === false){
        this.setState({navigator: true});
      }
      else if(delta_offset >= 100 && this.state.navigator === true){
        this.setState({navigator: false});
      }
    }
    else{
      if(this.state.navigator === false){
        this.setState({navigator: true});
      }
    }
  }

  set_modalTab(modalTab) {
    this.setState({modalTab: modalTab});
  }

  switchToHorizontal(){
    if(this.state.horizontal === false){
      this.setState({
        horizontal: true,
        navigator: true,
        modalTab: "Closed",
        postId: 1
      });
    }
  }

  switchToVertical(){
    this.setState({
      horizontal: false,
      navigator: true,
      modalTab: "Closed",
      postId: -1
    });
  }

  increaseTextInputHeight(){
    this.setState({textInputHeight: -200});
  }

  decreaseTextInputHeight(){
    this.setState({textInputHeight: 0});
  }

  renderTextInput(){
    if(this.state.horizontal === true){
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
          onFocus={()=>this.increaseTextInputHeight()}
          onBlur={()=>this.decreaseTextInputHeight()}
          returnKeyType="send"
        />
      )
    }
  }

}
