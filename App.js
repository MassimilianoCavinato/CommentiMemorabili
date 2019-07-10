import React from 'react';
import { View, Text, ScrollView, VirtualizedList } from 'react-native';

import PostDetail from './Components/PostDetail';
import PostItem from './Components/PostItem';
import Footer from './Components/Footer';
import SideWindow from './Components/SideWindow';
import * as POSTS from './assets/POSTS.json';

export default class App extends React.Component {
  
  constructor(){
    super()
    this.state = {
      cursor: '',
      posts: [],
      viewType: 'items',
      postId: 0,
      sideWindow: "",
      sideWindow: true
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
    this.setState({viewType: "detail", postId: postId });
    this.scrollview.scrollTo({ y: 0 });
  }

  render () {
    return (
      <View style={{ flex: 1, backgroundColor: '#ddd' , paddingTop: 24, fontFamily: 'Roboto'}}>
        {this.state.sideWindow ? <SideWindow /> : null }
        <ScrollView ref={(scrollview) => this.scrollview = scrollview}>
          {this.showContent()}
        </ScrollView>
        <Footer/>
      </View>
    )
  }
}