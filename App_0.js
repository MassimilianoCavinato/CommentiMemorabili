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
    super();
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
    this.loadPosts()
    .then(() => {
      this.setState({horizontal: false});
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.navigator !== this.state.navigator){
      return false;
    }else{
      return true;
    }
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
        {this.renderNavigator()}
        {this.renderScroller()}
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

    return new Promise((resolve, reject) => {
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
        }, () => resolve());
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
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
        this.setState({
          navigator: false
        });
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
  renderNavigator(){
    return (
      <TopNavigator
        set_modalTab={modalTab => this.set_modalTab(modalTab)}
        switchToVertical={() => this.switchToVertical()}
        visible={this.state.navigator}
      />
    );
  }
  renderScroller(){
    console.log('LIST RENDER ++++++++++');
      return (
        <VirtualizedList
          style={{ flex: 1 }}

          data={this.state.posts}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          keyExtractor={(item) => item._id}
          initialNumToRender={3}
          windowSize={9}
          ItemSeparatorComponent={() => this.state.horizontal === true ? null : <ListSeparator_0 />}
          // onScrollBeginDrag={(e) => this.setOffset(e)}
          // onScrollEndDrag={(e) => this.handle_ScrollEndDrag(e)}
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
      );
  }

  renderTextInput(){
    if(this.state.horizontal === true){
      return (
        <TextInput
          style={{
            height: 40,
            borderColor: 'red',
            borderWidth: 3,
            textAlign: 'center',
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
