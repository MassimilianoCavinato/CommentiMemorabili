
import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { View, Text, Button, VirtualizedList, Image, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import PostItem from './PostItem';
import ListSeparator_0 from './ListSeparator_0';

export default class VerticalScroll extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Memorabili',
      headerBackTitle: 'Torna',
      headerStyle: {
        backgroundColor: 'green',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <Icon size={32} style={{ marginRight: 16, borderRadius: 4 }} color="white" name={'account'} onPress={()=>navigation.navigate('UserProfile')}/>
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

  navigateToComments(id){
    this.props.navigation.navigate('HorizontalScroll', { post: this.state.posts.find(post => post._id === id) })
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
          horizontal={false}
          pagingEnabled={false}
          ItemSeparatorComponent={() => <ListSeparator_0 />}
          renderItem={ ({item, index}) => {
            return (
              <PostItem
                id={item._id}
                index={index}
                media={item.media}
                title={item.title}
                downvotes={item.downvotes}
                upvotes={item.upvotes}
                comments={item.comments}
                category={item.category}
                navigateToComments={(id)=> this.navigateToComments(id)}
              />
            );
          }}
        />
    );
  }
}
