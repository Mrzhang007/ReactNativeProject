import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
//侧栏
import SideMenu from 'react-native-side-menu'

import { Actions }  from 'react-native-router-flux'

import Home from './HomeTAB/home'
import ThemesDaily from './themesDaily'

import Menu from './Menu'

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


var myHomeComponet;

class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

export default class Basic extends Component {
  state = {
    isOpen: false,
    selectedItem: {
      name : "首页"
    }
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  onMenuItemSelected = (themesData) => { //选择item穿过来的值
    this.setState({
      isOpen: false,
      selectedItem: themesData,
    });
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    if (this.state.selectedItem.name == "首页") {
      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenuState(isOpen)}>
          <Home themesDataProps = {this.state.selectedItem}/>
          <Button  backgroundColor = {'red'} style={styles.button} onPress={() => this.toggle()}>
            <Image
              source={require('../Imgs/menu.png')} style={{width: 32, height: 32}} />
          </Button>
        </SideMenu>
      );
    }else {
      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenuState(isOpen)}>
          <ThemesDaily themesDataProps = {this.state.selectedItem}/>
          <Button  backgroundColor = {'red'} style={styles.button} onPress={() => this.toggle()}>
            <Image
              source={require('../Imgs/back-icon.png')} style={{width: 32, height: 32}} />
          </Button>
        </SideMenu>
      );
    }
  }
};
