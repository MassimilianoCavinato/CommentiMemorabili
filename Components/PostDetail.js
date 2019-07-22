import React from 'react';
import shuffle from 'shuffle-array';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import UpVotesCounter from './UpVotesCounter';
import DownVotesCounter from './DownVotesCounter';
import CommentsCounter from './CommentsCounter';
import Category from './Category';
import PostComment from './PostComment';
import ListSeparator_0 from './ListSeparator_0';
// import * as COMMENTS from '../assets/COMMENTS.json';


export default class PostItem extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      comments: [],
      textInputHeight: 0
    };
  }

  increaseTextInputHeight(){
    this.setState({textInputHeight: -200});
  }

  decreaseTextInputHeight(){
    this.setState({textInputHeight: 0});
  }

  loadComments(){
    this.setState({comments: shuffle(COMMENTS.default.map(c => Object.assign({}, c, { profile_picture: 'https://picsum.photos/id/'+Math.floor(Math.random() * 301)+'/300/300' })))});
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', width: Dimensions.get('window').width }}>
          <ScrollView style={{flex: 1}}>
            <Category categoryname={this.props.category} />
            <Text style={{fontWeight: 'bold', fontSize: 16, paddingLeft: 4 }}>{this.props.title}</Text>
            <ImageZoom
              cropWidth={this.props.width}
              cropHeight={260}
              imageWidth={this.props.width}
              imageHeight={260}
              style={{ backgroundColor: '#eee' }}
            >
              <Image
                style={{width: this.props.width, height: 260}}
                source={{ uri: this.props.media }}
                resizeMethod='scale'
                resizeMode='contain'
              />
            </ImageZoom>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              }}
            >
              <UpVotesCounter count={this.props.upvotes} style={{paddingRight: 20}}/>
              <CommentsCounter count={this.props.comments}/>
              <DownVotesCounter count={this.props.downvotes}/>
            </View>
            <FlatList
              ref='commentList'
              ItemSeparatorComponent={() => <ListSeparator_0 />}
              data={this.state.comments}
              keyExtractor={(item, index) => item._id}
              renderItem={ ({item}) => {
                return <PostComment
                  id={item._id}
                  user={item.user}
                  text={item.text}
                  profilePic={item.profile_picture}
                />
              }}
            />
        </ScrollView>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 4,
            margin: 2,
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
      </View>
    )
  }
}
