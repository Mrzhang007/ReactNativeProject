import React , { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Platform,
  BackAndroid,
} from 'react-native'


import { Router, Scene, ActionConst, TabBar, Actions ,Route}  from 'react-native-router-flux'  //导航
import TabIcon from './TabIcon'    //tabbar 的每个icon
import Advertisement from './advertisement'  //广告页
import Home from './HomeTAB/home' //tabbar的主页
import Reader from './ReaderTAB/reader'  //阅读
import HomeDetail from './HomeTAB/homeDetail'
import Basic from './Basic'    //侧栏



const ICON_IMG = [
  [require('../Imgs/tabbar_home.png'), require('../Imgs/tabbar_home_selected.png')],
  [require('../Imgs/tabbar_message_center.png'), require('../Imgs/tabbar_message_center_selected.png')],
  [require('../Imgs/tabbar_discover.png'), require('../Imgs/tabbar_discover_selected.png')],
  [require('../Imgs/tabbar_profile.png'), require('../Imgs/tabbar_profile_selected.png')],
]

class App extends Component {

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  // 注意这里为了方便后续removeEventListener，采用了用绑定this的函数属性的方法来创建回调函数，而非箭头函数或者bind(this)
  onBackAndroid = () => {
      console.log('返回000000');

      // alert('在更路由')

    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    // alert('再按一次退出应用')
    // ToastAndroid.show('再按一次退出应用');
    return true;

  }

  render() {
    return (
      <Router>
        <Scene key = "root">
          <Scene key = "advertisementKey" component = {Advertisement} title = "广告页" initial = {true}
          hideNavBar = {true}/>

          <Scene key = "sideMenuKey" component = {Basic} title = "" initial = {false}
          hideNavBar = {true} type = {ActionConst.RESET}/>

          <Scene key = "HomeDetailKey" component = {HomeDetail}  type = {ActionConst.PUSH} title = "" initial = {false}
          hideNavBar = {false}/>

          <Scene key = "TabbarKey"  tabs = {true} hideNavBar = {false} type = {ActionConst.RESET}  tabBarStyle={ styles.tabBar }  pressOpacity = {1}  default="HomeKey">
              <Scene key = "HomeKey" title = "主页" headerTitle = '知乎日报' icon={TabIcon}  iconName= {ICON_IMG[0][0]}
              iconSelctedName = {ICON_IMG[0][1]}  component={Home}
              initial={true}  hideNavBar = {true}/>

              <Scene key = "ReaderKey" title = "阅读" headerTitle = '阅读' icon={TabIcon}  iconName= {ICON_IMG[1][0]}
              iconSelctedName = {ICON_IMG[1][1]}  component={Reader}
              initial={false}/>

              <Scene key = "SearchKey" title = "发现" headerTitle = '发现' icon={TabIcon}  iconName= {ICON_IMG[2][0]}
              iconSelctedName = {ICON_IMG[2][1]}  component={Reader}
              initial={false}/>

              <Scene key = "ProfileKey" title = "我" headerTitle = '我' icon={TabIcon}  iconName= {ICON_IMG[3][0]}
              iconSelctedName = {ICON_IMG[3][1]}  component={Reader}
              initial={false}/>
          </Scene>
        </Scene>

      </Router>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: 49,
    backgroundColor: 'rgba(241,243,246,1)',

  },
  tabBarIconContainerStyle:{//提升icon的整体高度
    // marginTop: -49/2,
    // backgroundColor: 'red',
    // height: 1,
  }
});

export default App;
