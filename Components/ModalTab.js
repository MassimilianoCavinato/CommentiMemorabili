import React from 'react';
import Modal from 'react-native-modal';
import UserTab from './UserTab';

export default class ModalTab extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalTab: "Closed",
      swipeDirections: ['up', 'left', 'down', 'right']
    }
  }

  componentWillReceiveProps(props){
      this.setState({modalTab: props.modalTab});
  }

  onButtonPress(btn){
    switch(btn){
      case "facebook_login": this.setState({modalTab: "Closed"}); break;
      case "instagram_login": this.setState({swipeDirections: []}); break;
      case "instagram_login_close": this.setState({swipeDirections: ['up', 'left', 'down', 'right']}); break;
    }

  }

  renderTab() {
    return <UserTab onButtonPress={(btn)=>{this.onButtonPress(btn)}}/>
  }


  render() {
    return (
      <Modal
        isVisible={this.state.modalTab !== "Closed"}
        swipeDirection={this.state.swipeDirections}
        swipeThreshold={ 200 }
        animationOutTiming={100}
        onSwipeComplete={() => this.setState({modalTab: "Closed"})}
      >
      {this.renderTab()}
      </Modal>
    )
  }
}
