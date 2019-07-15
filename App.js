import React from 'react';
import { View, Text, ScrollView, VirtualizedList, Image, Dimensions } from 'react-native';
import PostDetail from './Components/PostDetail';
import PostItem from './Components/PostItem';
import Footer from './Components/Footer';
import ModalTab from './Components/ModalTab';
import * as POSTS from './assets/POSTS.json';

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
      height: 0
    }
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
      return (<PostDetail
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

      />);
    } else {
      let self = this;
      return <VirtualizedList
        data={this.state.posts}
        getItem={(data, index) => data[index]}
        getItemCount={data => data.length}
        keyExtractor={(item, index) => item._id}
        initialNumToRender={1}
        renderItem={ function({item}) {
          return <PostItem
            id={item._id}
            media={item.media}
            title={item.title}
            downvotes={item.downvotes}
            upvotes={item.upvotes}
            comments={item.comments}
            category={item.category}
            showPostDetail={()=> self.showPostDetail(item)}
          />
        }}
      />
    }
  }

  set_modalTab(modalTab) {
    this.setState({modalTab: modalTab});
  }

  showPostItems () {
    this.setState({viewType: 'items', modalTab: "Closed"}, () => {
      setTimeout(() => this.refs._scrollView.scrollTo({x: 0, y: this.state.scrollPos, animated: false}), 1000);
    });
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
      this.refs._scrollView.scrollTo({x: 0, y: 0, animated: false});
    }, error => {
      console.log('error:', error);
    });
  }


  render () {
    return (
      <View style={{ flex: 1, backgroundColor: '#ddd'}}>
        <View style={{ backgroundColor: '#6EC24C', height: 22 }} />
        <ScrollView
          ref='_scrollView'
          onMomentumScrollEnd={(e) => {
              if(this.state.viewType === 'items'){
                this.setState({scrollPos: e.nativeEvent.contentOffset.y, modalTab: "Closed"})
              }
            }}
        >
          {this.showContent()}
        </ScrollView>
        <ModalTab set_modalTab={modalTab => this.set_modalTab(modalTab)} modalTab={this.state.modalTab} />
        <Footer
          set_modalTab={modalTab => this.set_modalTab(modalTab)}
          showPostItems={() => this.showPostItems()}
        />
      </View>
    )
  }
}
