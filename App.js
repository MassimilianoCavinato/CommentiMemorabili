import React from 'react';
import shuffle from 'shuffle-array';
import { View, FlatList, Image, Dimensions } from 'react-native';
import PostDetail from './Components/PostDetail';
import PostItem from './Components/PostItem';
import TopNavigator from './Components/TopNavigator';
import ModalTab from './Components/ModalTab';
import * as POSTS from './assets/POSTS.json';
import * as COMMENTS from './assets/COMMENTS.json';
import { getUser } from './utils';
import ListSeparator_0 from './Components/ListSeparator_0';
import BannerSlim from './Components/BannerSlim';

export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      cursor: '',
      posts: [],
      comments: [],
      viewType: 'item',
      postId: 0,
      modalTab: "Closed",
      scrollPos: 0,
      width: 0,
      height: 0,
      user: null,
      navigator: true,
    }

    this._onViewableItemsChanged = ({ viewableItems, changed }) => {
      if(this.state.viewType === 'detail'){
        this.loadComments();
      }
    };

    this._viewabilityConfig = {
      itemVisiblePercentThreshold: 50
    };
  }

  loadComments(){
    this.setState({comments: shuffle(COMMENTS.default.map(c => Object.assign({}, c, { profile_picture: 'https://picsum.photos/id/'+Math.floor(Math.random() * 301)+'/300/300' })))});
  }

  componentWillMount() {
    getUser().then(user => console.log(user));
  }

  componentDidMount () {
    this.setState({posts: POSTS.default});
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


  showContent () {

    if(this.state.viewType == 'detail'){
      post = this.state.posts.find(post => post._id === this.state.postId);
      return (
        <FlatList
          data={this.state.posts}
          initialNumToRender={1}
          keyExtractor={(item) => item._id}
          horizontal={true}
          pagingEnabled={true}
          viewabilityConfig={this._viewabilityConfig}
          onViewableItemsChanged={this._onViewableItemsChanged}
          renderItem={ ({item, index}) => (
            <PostDetail
              id={item._id}
              media={item.media}
              title={item.title}
              downvotes={item.downvotes}
              upvotes={item.upvotes}
              comments={this.state.comments}
              category={item.category}
              width={this.state.width}
              height={this.state.height}
          />
          )}
        />
      );
    } else {
      return (
        <FlatList
          ref='_scrollView'
          data={this.state.posts}
          ItemSeparatorComponent={() => <ListSeparator_0 />}
          keyExtractor={(item) => item._id}
          onScrollBeginDrag={(e) => this.setOffset(e)}
          onScrollEndDrag={(e) => this.handle_ScrollEndDrag(e)}
          pagingEnabled={false}
          viewabilityConfig={this._viewabilityConfig}
          onViewableItemsChanged={this._onViewableItemsChanged}
          renderItem={ ({item, index}) => (
            <PostItem
              index={index}
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
        width: width,
        navigator: true
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
          visible={this.state.navigator}
        />
        {this.showContent()}
        <BannerSlim />
        <ModalTab set_modalTab={modalTab => this.set_modalTab(modalTab)} modalTab={this.state.modalTab} />
      </View>
    )
  }
}
