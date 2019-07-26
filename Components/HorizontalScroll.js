
import React from 'react';
import { View,VirtualizedList} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import PostDetail from './PostDetail';


import * as COMMENTS from '../assets/POSTS.json';

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
        <Icon size={32} color="white" style={{ marginRight: 8 }} name={'account'} onPress={()=>navigation.navigate('UserProfile')}/>
      )
    }
  }

  constructor(){
    super();
    this.state = {
      posts: [],
      loading: true
    }


    // this._onViewableItemsChanged = ({ viewableItems, changed }) => {
    //   if(viewableItems.length > 0){
    //     this.currentPost = viewableItems[0].item;
    //   }
    // };

    // this._viewabilityConfig = {
    //   viewAreaCoveragePercentThreshold: 50
    // };
  }

  componentDidMount(){
    this.setState({ posts: [this.props.navigation.getParam('post', {})]});
  }

  loadNextBatch(postId){
    this.setState({ posts: COMMENTS.default});
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
            // viewabilityConfig = {this._viewabilityConfig}
            // onViewableItemsChanged = {this._onViewableItemsChanged}
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
                  navigation={this.props.navigation}
                />
              );
            }}
          />
          
        </View>
    );
  }
}
