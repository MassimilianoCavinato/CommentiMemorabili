import React from 'react';
import shuffle from 'shuffle-array';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, VirtualizedList, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import UpVotesCounter from './UpVotesCounter';
import DownVotesCounter from './DownVotesCounter';
import CommentsCounter from './CommentsCounter';
import Category from './Category';
import PostComment from './PostComment';
import ListSeparator_0 from './ListSeparator_0';
import * as COMMENTS from '../assets/COMMENTS.json';

export default class PostDetail extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      width: undefined,
      height: undefined,
      comments: []
    }
  }

  componentDidMount() {
    Image.getSize(this.props.media, (srcWidth, srcHeight) => {
      const maxHeight = Dimensions.get('window').height;
      const maxWidth = Dimensions.get('window').width;
      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
      this.setState({ width: srcWidth * ratio, height: srcHeight * ratio });
    }, error => {
      console.log('error:', error);
    });
    this.loadComments();
  }

  loadComments(){
    this.setState({comments: COMMENTS.default.map(c => Object.assign({}, c, { profile_picture: 'https://picsum.photos/id/'+Math.floor(Math.random() * 301)+'/300/300' }))});
  }

  render() {
    return (
      <VirtualizedList style={{flex: 1, backgroundColor: '#fff', width: Dimensions.get('window').width }}
        listKey={this.props._id}
        data={this.state.comments}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item._id}
        initialNumToRender={3}
        windowSize={9}
        ItemSeparatorComponent={() => <ListSeparator_0 />}
        ListHeaderComponent= {
          <View>
            <TouchableOpacity>
              <Category categoryname={this.props.category} />
              <Text style={{fontWeight: 'bold', fontSize: 18, paddingLeft: 4 }}>{this.props.title}</Text>
            </TouchableOpacity>
            <Image
              style={{width: this.state.width, height: this.state.height}}
              source={{ uri: this.props.media }}
              resizeMethod='scale'
              resizeMode='contain'
            />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity onPress={() => alert('DOWNVOTE: '+this.props.title)}>
                <DownVotesCounter count={this.props.downvotes}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <CommentsCounter count={this.props.comments}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('UPVOTE: '+this.props.title)}>
                <UpVotesCounter count={this.props.upvotes}/>
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={ ({item}) => {
          return (
            <PostComment
              id={item._id}
              user={item.user}
              text={item.text}
              profilePic={item.profile_picture}
            />
          )
        }}
      />
    )
  }
}
