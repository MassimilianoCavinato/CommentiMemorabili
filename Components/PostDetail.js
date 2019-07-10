import React from 'react';
import shuffle from 'shuffle-array';
import {Text, View, Image, Dimensions, TouchableHighlight, VirtualizedList } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import UpVotesCounter from './UpVotesCounter';
import DownVotesCounter from './DownVotesCounter';
import CommentsCounter from './CommentsCounter';
import Category from './Category';
import PostComment from './PostComment';
import * as COMMENTS from '../assets/COMMENTS.json';


export default class PostItem extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {comments: []};
  }

  componentDidMount(){
    this.setState({comments: COMMENTS.default});
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff', marginBottom: 16 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableHighlight onPress={this.props.showPrev}> 
            <Icon size={32} color="gray" name={"arrow-left-bold"}>
              PREV
            </Icon>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.props.showNext}>
            <Icon size={32} color="gray" name={"arrow-right-bold"} >
              NEXT
            </Icon>
          </TouchableHighlight>
        </View>
        <Category categoryname={this.props.category} />
        <Text style={{fontWeight: 'bold', fontSize: 22, paddingLeft: 4, fontFamily: 'sans-serif-condensed'}}>{this.props.title}</Text>
        <ImageZoom 
          cropWidth={Dimensions.get('window').width} 
          cropHeight={500}
          imageWidth={Dimensions.get('window').width}
          imageHeight={500}
          style={{ backgroundColor: '#444' }}
        >
          <Image style={{minHeight: 500}} resizeMode='contain' source={{uri: this.props.media}}/>
        </ImageZoom>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <UpVotesCounter count={this.props.upvotes} style={{paddingRight: 20}}/> 
          <DownVotesCounter count={this.props.downvotes}/>
          <CommentsCounter count={this.props.comments}/>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableHighlight onPress={this.props.showPrev}> 
            <Icon size={32} color="gray" name={"arrow-left-bold"}>
              PREV
            </Icon>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.props.showNext}>
            <Icon size={32} color="gray" name={"arrow-right-bold"} >
              NEXT
            </Icon>
          </TouchableHighlight>
        </View>
        <VirtualizedList
          data={shuffle(this.state.comments)}
          getItem={(data, index) => data[index]}
          getItemCount={data => data.length}
          keyExtractor={(item, index) => item._id}
          initialNumToRender={1}
          renderItem={ function({item}) { 
            return <PostComment 
              id={item._id}
              user={item.user}
              text={item.text}
            />
          }}
        />
      </View>
    )
  }
}


    
