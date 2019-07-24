
import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { View, Text, Button, VirtualizedList, Image, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import PostDetail from './PostDetail';

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
    }
  }

  componentDidMount(){
    this.loadPosts();
  }

  loadPosts(){
    this.setState({ posts: require('../assets/POSTS.json')});
  }

  render() {
      return (
        <VirtualizedList
          style={{ flex: 1 }}
          data={this.state.posts}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          keyExtractor={(item) => item._id}
          initialNumToRender={3}
          windowSize={9}
          horizontal={true}
          pagingEnabled={true}
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
                navigateToComments={()=>false}
              />
            );
          }}
        />
    );
  }
}
