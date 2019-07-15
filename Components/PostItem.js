import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import UpVotesCounter from './UpVotesCounter';
import DownVotesCounter from './DownVotesCounter';
import CommentsCounter from './CommentsCounter';
import Category from './Category';

export default class PostItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      width: undefined,
      height: undefined
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
  }

  render() {
    console.log('rendering');
    return (
      <View style={{backgroundColor: '#fff', marginBottom: 16, flex: 1}}>
        <Category categoryname={this.props.category} />
        <Text style={{fontWeight: 'bold', fontSize: 18, paddingLeft: 4 }}>{this.props.title}</Text>
        <TouchableOpacity
           onPress={() => this.props.showPostDetail(this.props.id)}
        >
          <Image
            style={{width: this.state.width, height: this.state.height }}
            source={{ uri: this.props.media }}
            resizeMethod='scale'
            resizeMode='contain'
          />
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <UpVotesCounter count={this.props.upvotes}/>
          <DownVotesCounter count={this.props.downvotes}/>
          <CommentsCounter count={this.props.comments}/>
        </View>
      </View>
    )
  }
}
