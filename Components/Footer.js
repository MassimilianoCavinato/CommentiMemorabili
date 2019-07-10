import React from 'react';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
 
export default class Footer extends React.Component {
  tabs = [
    {
      key: 'Fresh',
      icon: 'flash-circle',
      label: 'Fresh',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'Hot',
      icon: 'star-face',
      label: 'Hot',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'Category',
      icon: 'menu',
      label: 'Category',
      barColor: '#19CCFF',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'User',
      icon: 'death-star',
      label: 'User',
      barColor: '#19CCFF',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ]
 
  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )
 
  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )
 
  render() {
    return (
      <BottomNavigation
        onTabPress={newTab => this.setState({ activeTab: newTab.key })}
        renderTab={this.renderTab}
        tabs={this.tabs}
      />
    )
  }
}