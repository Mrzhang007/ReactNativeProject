import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Dimensions,//获取窗口的宽高
  NavigatorIOS,
  TouchableOpacity,
  ActivityIndicator,//菊花控件
} from 'react-native';

import SideMenuTopButton from './SideMenu/sideMenuTopButton'


const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
var DataURL = 'http://news-at.zhihu.com/api/4/themes';//主题日报

const backColor = 'rgba(34,41,47,1)'  //背景色
const titleColor_nomal = 'rgba(124,129,134,1)' //正常文字的颜色
const homeThemes = {
  name: "首页"
}

const TopButtonArr = [
  ["收藏",require('../Imgs/tabbar_home_selected@2x.png')],
  ["消息",require('../Imgs/tabbar_message_center_selected@2x.png')],
  ["设置",require('../Imgs/tabbar_profile_selected@2x.png')],
]

const leftImageArr = [require('../Imgs/signup_add_arrow@2x.png'),
require('../Imgs/tabbar_compose_background_icon_add@2x.png')]

var leftImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex:1,
    backgroundColor: backColor,//listView 背景色
  },
  rowSeparator: {
    backgroundColor: 'black',
    height: 0.5,
  },
  avatarContainer: {
    backgroundColor: backColor,
    height: 64,
  },
  avatar: {
    marginLeft: 15,
    marginTop: 28,
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  buttonContainer: {
    backgroundColor: backColor,
    height: 125-64,
    flexDirection: 'row',
    // marginTop: 20,
  },
  sideMenuTopButton: {
    backgroundColor: 'white',
    marginTop: 20,
    marginLeft: 20,
    height: 40,
    width: 40,
  },
  name: {
    position: 'absolute',
    color: titleColor_nomal,
    height: 20,
    left: 70,
    top: 36,
  },

  containerbtn: {
    width: 70,
    height: 125-64,
    // backgroundColor: 'green',
    alignItems: 'center',    //左右居中
  },
  buttonImage: {
    marginTop: 15,
    width: 20,
    height: 20,
    // backgroundColor: 'red'
  },
  buttonTitle: {
    marginTop: 8,
    fontSize: 12,
    height: 16,
    width: 30,
    color: titleColor_nomal,
    textAlign: 'center',
  },
});

export default class Menu extends Component {
  constructor(props) {
    console.log(props.myProp);
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
    this.renderRow = this.renderRow.bind(this);
  }
  componentDidMount() {
    this.fetchNewsData();
  }
  fetchNewsData() {
    fetch(DataURL)
    .then((response)=>response.json())
    .then((responseData) => {
      console.log(responseData);
      responseData.others.unshift(homeThemes)  //讲元素加入数组的第一个
      this.setState({//setState会触发一次重绘
        dataSource: this.state.dataSource.cloneWithRows(responseData.others),
      });
    })
  }
  cellSelected(rowData){
    console.log(rowData);

    this.props.onItemSelected(rowData)

  }
  renderRow(rowData) {
     if (rowData.name == "首页") {
       leftImage = leftImageArr[0]
     }else {
       leftImage = leftImageArr[1]
     }
    return (
      <TouchableOpacity
      //onPress = {this.cellSelected.bind(this)}
      onPress ={
					() => this.cellSelected(rowData)
			}
      newsData = {rowData}
      >
      <View
      style = {{
         height: 50,
         flexDirection: 'row',
         backgroundColor: 'rgba(34,41,47,1)',
      }}>
      <Text
      style = {{
        flex: 1,
        marginTop: 15,
        marginLeft: 15,
        height:20,
        color: titleColor_nomal,
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Helvetica Neue',
      }}>
        {rowData.name}
      </Text>
      <Image style = {{
        marginTop: (50-16)/2,
        marginRight: 40,
        width: 16,
        height: 16,
        // backgroundColor: 'red'
      }}
      source = {leftImage}
      />
      </View>
      </TouchableOpacity>
    );
  }
  //  渲染cell的分割
  renderSeparator(
    sectionID,
    rowID
  ) {
      return (
        <View key = {'cell_'+ sectionID + '_' + rowID} style = {styles.rowSeparator}/>
      );
  }

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <View  style = {styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri, }}
            />
          <Text style={styles.name}>zhangzhong</Text>
        </View>
        <View style = {styles.buttonContainer}>
          <TopButton buttonResourse = {TopButtonArr[0]}/>
          <TopButton buttonResourse = {TopButtonArr[1]}/>
          <TopButton buttonResourse = {TopButtonArr[2]}/>
        </View>
        <ListView
         style = {styles.listContainer}
         dataSource = {this.state.dataSource}
         renderRow = {this.renderRow}
         renderSeparator = {this.renderSeparator}
         enableEmptySections = {true}
         automaticallyAdjustContentInsets = {false}// 如果是scrollView和ListVIew去掉20像素的空白
        />
      </View>
    );
  }
};

class TopButton extends Component {
  render() {

    const {
        buttonResourse,
    } = this.props;

    return(
      <TouchableOpacity>
      <View style = {styles.containerbtn}>
        <Image source = {buttonResourse[1]} style = {styles.buttonImage}/>
        <Text style = {styles.buttonTitle}>{buttonResourse[0]}</Text>
      </View>
      </TouchableOpacity>
    );
  }
}

// const styles = StyleSheet.create({
//     containerbtn: {
//       width: 70,
//       height: 125-64,
//       // backgroundColor: 'green',
//       alignItems: 'center',    //左右居中
//     },
//     buttonImage: {
//       marginTop: 15,
//       width: 20,
//       height: 20,
//       backgroundColor: 'red'
//     },
//     buttonTitle: {
//       marginTop: 8,
//       fontSize: 12,
//       height: 16,
//       width: 30,
//       color: titleColor_nomal,
//       textAlign: 'center',
//     },
// });
