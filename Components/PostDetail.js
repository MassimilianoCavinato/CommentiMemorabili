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
import BannerLarge from './BannerLarge';
import * as COMMENTS from '../assets/COMMENTS.json';


export default class PostDetail extends React.Component {

  constructor(props){
    super(props)
    const maxHeight = Dimensions.get('window').height;
    const maxWidth = Dimensions.get('window').width;
    const ratio = Math.min(maxWidth / this.props.srcWidth, maxHeight / this.props.srcHeight);
    this.width = this.props.srcWidth * ratio;
    this.height = this.props.srcHeight * ratio
    this.state = {
      comments: [],
      textInputHeight: 0
    };
  }

  componentDidMount(){
      this.loadComments();
  }



  loadComments(){
    this.setState({comments: shuffle(COMMENTS.default.map(c => Object.assign({}, c, { profile_picture: 'https://picsum.photos/id/'+Math.floor(Math.random() * 301)+'/300/300' })))});
  }
  renderBanner(){
    if(this.props.index % 4 === 0 && this.props.index != 0 && this.props.horizontal === false){
      return <View>
        <ListSeparator_0 />
        <BannerLarge />
      </View>
    }else{
      return null;
    }
  }



  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', width: Dimensions.get('window').width }}>
        <FlatList
          ref='commentList'
          ListHeaderComponent= {
            <View>
              <TouchableOpacity
                 onPress={() => this.props.switchToHorizontal()}
              >
                <Category categoryname={this.props.category} />
                <Text style={{fontWeight: 'bold', fontSize: 18, paddingLeft: 4 }}>{this.props.title}</Text>
              </TouchableOpacity>

              <Image
                style={{width: this.width, height: this.height}}
                source={{ uri: this.props.media }}
                resizeMethod='scale'
                resizeMode='contain'
              />

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                }}
              >
                <UpVotesCounter count={this.props.upvotes} style={{paddingRight: 20}}/>
                <TouchableOpacity
                   onPress={() => this.props.switchToHorizontal()}
                >
                  <CommentsCounter count={this.props.comments}/>
                </TouchableOpacity>
                <DownVotesCounter count={this.props.downvotes}/>
              </View>
              {this.renderBanner()}
            </View>
          }
          ItemSeparatorComponent={() => {
            if(this.props.horizontal === true){
              return <ListSeparator_0 />;
            } else {
              return null;
            }
          }}
          data={this.state.comments}
          keyExtractor={(item, index) => item._id+this.props.id}
          
          renderItem={ ({item}) => {
            if(this.props.horizontal === true){
              return <PostComment
                id={item._id}
                user={item.user}
                text={item.text}
                profilePic={item.profile_picture}
              />
            } else {
              return null;
            }
          }}
        />
      </View>
    )
  }
}
