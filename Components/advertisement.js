import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import Global from './global'

import { Actions }  from 'react-native-router-flux'


export default class Advertisement extends Component {

  _skipButtonHandle() {
    // alert('122')
    Actions.sideMenuKey();
  }

  render() {
    //给pageTwo 传递参数
    // const gotoPageTwo = () => Actions.pageTwoKey({text: 'hello pageTwo！'});
    return(
      <View
      style = {styles.container}
      >
      <Image
      style={styles.advImage}
      source={{uri: 'http://api.test.mocire.com/doctorapi/ad_imgs/docAds6.jpg'}}
      >
      <TouchableHighlight
      style = {styles.skipAdvBtn}
      onPress = {this._skipButtonHandle.bind(this)}
      >
        <Text style = {styles.skipBtnTitle}>
          跳过
        </Text>
      </TouchableHighlight>
      </Image>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  advImage: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  skipAdvBtn: {//跳过按钮
    alignSelf: 'flex-end',//alignSelf的对齐方式主要有四种：flex-start、flex-end、center、auto、stretch。默认start
    marginRight : 20,
    marginTop: 30,
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor : Global.cloudyBlueColor,
    // "rgba(0,0,0,0.5)",
    justifyContent: 'center',//垂直居中
    overflow: 'hidden',
  },
  skipBtnTitle: {
    color: 'white',
    textAlign: 'center',
  }
});
