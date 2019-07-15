import React from 'react';
import Modal from 'react-native-modal';
import UserTab from './UserTab';

export default class ModalTab extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalTab: "Closed"
    }
  }

  componentWillReceiveProps(props){
      this.setState({modalTab: props.modalTab});
  }

  renderTab() {
    if(this.state.modalTab === 'User'){
      return <UserTab />
    }
    else{
      return <UserTab />
    }
  }

  render() {
    return (
      <Modal
        isVisible={this.state.modalTab !== "Closed"}
        swipeDirection={['up', 'left', 'down', 'right']}
        swipeThreshold={ 100 }
        onSwipeComplete={() => this.setState({modalTab: "Closed"})}
      >
      {this.renderTab()}
      </Modal>
    )
  }
}
