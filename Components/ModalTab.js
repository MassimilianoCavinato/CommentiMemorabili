import React from 'react';
import Modal from 'react-native-modal';
import UserLogin from './UserLogin';

export default class ModalTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: this.props.activeTab,
      visible:  false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.activetab === "" || typeof nextProps.activeTab === "undefined"){
      this.setState({ visible: false, activeTab: '' });
    }
    else{
      this.setState({ visible: true, activeTab: nextProps.activeTab });
    }
  }

  render() {
    return (
      <Modal 
        isVisible={this.state.visible}
        swipeDirection={['up', 'left', 'down', 'right']}
        swipeThreshold={ 100 }
        onSwipeComplete={() => this.setState({visible: false, activeTab: ''})}
      >
        {this.state.visible ? <UserLogin /> : <UserLogin />}
      </Modal>
    )
  }
}

