import React from 'react';
import { View, Text, ScrollView, VirtualizedList } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import TabBottom from './Components/TabBottom';
import PostDetail from './Components/PostDetail';
import PostItem from './Components/PostItem';
import Footer from './Components/Footer';
import * as POSTS from './assets/POSTS.json';

export default class App extends React.Component {
  
  constructor(){
    super()
    this.state = {
      cursor: '',
      posts: [],
      viewType: 'items',
      postId: 0,
      tabBottom: 'closed'
    }
  }

  onSwipe(gestureName, gestureState) {
    if(this.state.tabBottom !== 'closed'){
      this.set_TabBottom('closed');
    }
  }

  componentDidMount () {
    this.setState({posts: POSTS.default});
  }

  showPrev () {
   let curr_index = this.state.posts.findIndex(post => post._id === this.state.postId);
   if(curr_index !== 0){
    let prev_index = curr_index - 1;
    let prev_id = this.state.posts[prev_index]._id;
    this.showPostDetail(prev_id);
   }
  }

  showNext () {
    let curr_index = this.state.posts.findIndex(post => post._id === this.state.postId);
    if(curr_index < this.state.posts.length - 1){
      let next_index = curr_index + 1;
      let next_id = this.state.posts[next_index]._id;
      this.showPostDetail(next_id);
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
        category={"Categoria ..."}
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
            category={"Categoria ..."}
            showPostDetail={()=> self.showPostDetail(item._id)}
          />
        }}
      />
    }
  }

  showPostDetail (postId) {
    this.setState({viewType: "detail", postId: postId, tabBottom: 'closed' });
    this.scrollview.scrollTo({ y: 0 });
  }

  TabBottom() {
    if(this.state.tabBottom === 'closed'){
      return null;
    }
    else{
      return <TabBottom style={{zIndex: 0}} tab={this.state.tabBottom}/>
    }
  }

  set_TabBottom(tab){
    if(this.state.tabBottom !== tab){
      console.log('setting tab bottom', tab);
      this.setState({ tabBottom: tab });
    }
  }

  render () {
    return (
      <View style={{ flex: 1, backgroundColor: '#ddd' , paddingTop: 24}}>
         {this.TabBottom()}
        {/* <GestureRecognizer 
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
          style={{ flex: 1 }}
        > */}
          <ScrollView ref={(scrollview) => this.scrollview = scrollview}>
            {this.showContent()}
          </ScrollView>
        {/* </GestureRecognizer> */}
        <Footer set_TabBottom={tab => this.set_TabBottom(tab)}/>
      </View>
    )
  }
}