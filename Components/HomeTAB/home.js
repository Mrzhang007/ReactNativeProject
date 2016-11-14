import React, { Component } from 'react';
import {
  AppRegistry,
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


import {Actions} from 'react-native-router-flux'
import HomeTopScrollView from './homeTopScrollView'

var DataURL =  new Request('http://news-at.zhihu.com/api/4/news/latest');

var top_stories = ['123','23332']   //图片轮播

class Home extends Component {
  constructor(props) {
    // console.log(props.myProp);
    super(props);
    this.fetchNewsData = this.fetchNewsData.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      isloding: 'ture',
    };
    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

//相当于ViewDidLoad
  componentDidMount() {//React会在react-native组件加载完成后，使用componentDidMount方法发送请求，并且只发送一次。
    // this.fetchNewsData();
    this.fetchNewsData();
  }
  // //  设置数据
  fetchNewsData() {

    fetch(DataURL)
    .then((response)=>{
      if (response.ok) {
            return response.json()
      } else {
            console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
      }
    })
    .then((responseData) => {
      // console.log('数据'+JSON.stringify(responseData));
      top_stories = responseData.top_stories
      // console.log(top_stories);
      this.setState({//setState会触发一次重绘
        dataSource: this.state.dataSource.cloneWithRows(responseData.stories),
        isloding: 'false',
      });
      return responseData
    })
    .catch((error) => {
        console.error('错误'+error);
    });
    // this.setState({ //setState会触发一次重绘
    //   dataSource: this.state.dataSource.cloneWithRows([{'title':'ReactNativeLearn ListView'},
    //                                                     {'title':'ReactNativeLearn ListView'},
    //                                                     {'title':'ReactNativeLearn ListView'},
    //                                                     {'title':'ReactNativeLearn ListView'},
    //                                                     {'title':'ReactNativeLearn ListView'},
    //                                                     {'title':'ReactNativeLearn ListView'},
    //                                                     {'title':'ReactNativeLearn ListView'},
    //                                                     {'title':'ReactNativeLearn ListView'},
    //                                                     {'title':'ReactNativeLearn ListView'},
    //                                                     {'title':'ReactNativeLearn ListView'}])
    // });

  }

  cellSelected(rowData){
    //传递参数
    Actions.HomeDetailKey({newsData: rowData})

  }


  //  渲染cell
  renderRow(rowData) {
    return (
      // {this.ButtonClick.bind(this)}
      <TouchableOpacity
      //onPress = {this.cellSelected.bind(this)}
      onPress ={
					() => this.cellSelected(rowData)
			}
      newsData = {rowData}
      >
      <View
      style = {{
         flex: 1,
         height: 90,
         flexDirection: 'row',
         backgroundColor: 'white',
      }}>
      <Text
      style = {{
        flex: 1,
        marginTop: 15,
        marginLeft: 15,
        height:60,
        color: 'black',
        fontSize: 16,
        fontWeight: 'normal',
        // backgroundColor: 'blue',
        fontFamily: 'Helvetica Neue',
      }}>
        {rowData.title}
      </Text>
      <Image style = {{
        marginTop: 15,
        marginRight: 15,
        marginLeft: 25,
        width: 75,
        height: 60,
        backgroundColor: 'rgba(100,100,200,1)'
      }}
      source = {{uri:rowData.images[0]}}
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
//listview  的header
  renderHeader(){
    return (
      <HomeTopScrollView  imagesResourse = {top_stories} style = {styles.homeTopScrollView}/>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
         style = {styles.listContainer}
         dataSource = {this.state.dataSource}
         renderRow = {this.renderRow}
         renderSeparator = {this.renderSeparator}
         renderHeader = {this.renderHeader}
         enableEmptySections = {true}
         automaticallyAdjustContentInsets = {false}// 如果是scrollView和ListVIew去掉20像素的空白
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 49,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height-49,
  },
  // listContainer: {
  //   // flex:1,
  //   height: 100,
  //   // marginTop: 100,
  //   backgroundColor: 'rgb(237, 240, 235)',//listView 背景色
  // },
  // rowSeparator: {
  //   // marginLeft: 15,
  //   // marginRight: 15,
  //   // // backgroundColor: 'gray',//分割线的颜色
  //   height: 1,
  // },
  homeTopScrollView: {
    flex: 1,
    backgroundColor: 'red',
    height: 220,
  },
});



// const styles = StyleSheet.create({
//   container: {
//     flex: 1, //当一个元素定义了flex属性时，表示该元素是可伸缩的（flex的属性值大于0的时候才可伸缩）。
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });

export default Home;
