
import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { View, Text, Button, VirtualizedList, Image, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import PostDetail from './PostDetail';
import CommentTextInput from './CommentTextInput';
import CommentTextPreview from './CommentTextPreview';
import { getUser } from '../utils';
import * as COMMENTS from '../assets/POSTS.json'
export default class HorizontalScroll extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Commenti',
      headerBackTitle: 'Torna',
      headerStyle: {
        backgroundColor: 'green',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <Icon size={32} color="white" name={'account'} onPress={()=>navigation.navigate('UserProfile')}/>
      )
    }
  }

  constructor(){
    super();
    this.state = {
      posts: [],
      loading: true 
    }


    this._onViewableItemsChanged = ({ viewableItems, changed }) => {
      if(viewableItems.length > 0){
        this.currentPost = viewableItems[0].item;
      }
    };

    this._viewabilityConfig = {
      viewAreaCoveragePercentThreshold: 50
    };
  }

  componentDidMount(){
<<<<<<< HEAD
    let postId = this.props.navigation.getParam('currentPostId', {});
    this.loadPosts(postId);

=======
    this.setState({ posts: [this.props.navigation.getParam('post', {})]});
>>>>>>> 442634b7354bfc75c7e3cebb16710036c3079e07
  }

  loadNextBatch(postId){
    this.setState({ posts: COMMENTS.default});
  }

  submitComment(text){
    let post = this.currentPost;
    getUser()
    .then(user => {
      if(user == null){
        alert('Devi essere loggato');
        this.props.navigation.navigate('UserProfile');
      }
      else{
        setTimeout(()=>{
          alert(`
            Mandando Commento
            \n
            Utente: ${user.full_name}
            \n
            Post: ${post.title}
            \n
            Testo: ${text}
          `);
        }, 300);
      }
    });
  }

  render() {
      return (
        <View style={{flex: 1}}>
          <VirtualizedList
            ref='HorizontalScroll'
            style={{ flex: 1 }}
            data={this.state.posts || []}
            getItemCount={(data) => data === null ? 0: data.length}
            getItem={(data, index) => data[index]}
            keyExtractor={(item) => item._id}
            initialNumToRender={3}
            windowSize={9}
            horizontal={true}
            pagingEnabled={true}
            viewabilityConfig = {this._viewabilityConfig}
            onViewableItemsChanged = {this._onViewableItemsChanged}
            renderItem={ ({item, index}) => {
              return (
                <PostDetail
                  id={item._id}
                  index={index}
                  media={item.media}
                  title={item.title}
                  downvotes={item.downvotes}
                  upvotes={item.upvotes}
                  comments={item.comments}
                  category={item.category}
                />
              );
            }}
          />

          <CommentTextInput submitComment={(text)=>this.submitComment(text)} />
        </View>
    );
  }
}
