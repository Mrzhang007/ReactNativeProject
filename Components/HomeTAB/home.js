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
  Platform,
  RefreshControl,
} from 'react-native';


import {Actions} from 'react-native-router-flux'
import HomeTopScrollView from './homeTopScrollView'

var DataURL =  new Request('http://news-at.zhihu.com/api/4/news/latest');

var top_stories = []   //图片轮播
var stories = []
var daily; //当前请求的日子的新闻

var Car = require('./car.json')
var allArr = []

var page = 0;

class Home extends Component {
  constructor(props) {

    var getSectionHeaderData = (dataBlob,sectionID) => {
        return dataBlob[sectionID];
    };
    var getRowData = (dataBlob,sectionID,rowID) => {
        return dataBlob[sectionID + ":" + rowID];
    };
    // console.log(props.myProp);
    super(props);
    this.fetchNewsData = this.fetchNewsData.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
        getSectionHeaderData:getSectionHeaderData,
        getRowData:getRowData,
        sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
        rowHasChanged:(s1, s2) => s1 != s2,
      }),
      animating: true,
    };
    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    // this.getRefreshControl = this.getRefreshControl.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
  }

//相当于ViewDidLoad
  componentDidMount() {//React会在react-native组件加载完成后，使用componentDidMount方法发送请求，并且只发送一次。
    // this.fetchNewsData();
    this.fetchNewsData(DataURL);
  }
  // //  设置数据
  fetchNewsData(url) {

    fetch(url)
    .then((response)=>{
      if (response.ok) {
            return response.json()
      } else {
            console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
      }
    })
    .then((responseData) => {
      // console.log(JSON.stringify(responseData));
      top_stories = responseData.top_stories
      stories =  responseData.stories;

      allArr.push(responseData)
      var dataBlob = {},sectionIDs = [],rowIDs = [];
      for (var i = 0; i < allArr.length; i++) {
        sectionIDs.push(i) //第一个section
        dataBlob[i] = allArr[i].date; //时间
        // alert(JSON.stringify(allArr[i].date))
        // 3.设置该组中每条数据的结构
        rowIDs[i] = []

        rowStories = allArr[i].stories

        for (var j = 0; j < rowStories.length; j++) {
          //    改组中的每条对应的rowId
          rowIDs[i].push(j);
          // 把每一行中的内容放入dataBlob对象中
          dataBlob[i+':'+j] = rowStories[j]
        }
      }

      // alert(JSON.stringify(dataBlob))
      // console.log(top_stories);
      this.setState({//setState会触发一次重绘
        // dataSource: this.state.dataSource.cloneWithRows(stories),
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs),
        animating: false,
        isLoadingMore: false,
      });
      // return responseData
    })
    .catch((error) => {
        console.error('错误'+error);
    });
  }

  cellSelected(rowData){
    //传递参数
    Actions.HomeDetailKey({newsData: rowData})

  }
  renderSectionHeader(sectionData,sectionID) {
//根据当前时间获取是周几
    var year, month , date ,
    year = sectionData.substring(0,4)
    month = sectionData.substring(4,6)-1
    date = sectionData.substring(6,8)

    var dt = new Date(year, month, date), dt2 = new Date();
    var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    //周几
    var zhou = weekDay[dt.getDay()]
    if (sectionID == 0) {
      return null
    }else {
      return (
        <View style = {{flex:1,alignItems:'center',justifyContent:'center',height:40,backgroundColor:'rgba(24,144,211,1)'}}>
          <Text style = {{color: 'white',fontSize:17,}}>
          {(month+1)+'月'+date+'日'+'  '+zhou}
          </Text>
        </View>
      )
    }
  }

  //  渲染cell
  renderRow(rowData,sectionID,rowID) {

    // console.log('========='+rowData+'----========='+sectionID);

// alert(JSON.stringify(rowData))

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
        <View style = {{
          position: 'absolute',
          top: 89.5,
          backgroundColor: 'rgba(238,238,238,1)',
          height: 0.5,
          left: 15,
          width: Dimensions.get('window').width-30,
        }} />

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
  //获取当前日期的前一天
  getBeforeDay(numberDay) {
    var date = new Date();
    var preDate = new Date(date.getTime() - numberDay*24*60*60*1000);  //前numberDay天
    return preDate;
  }
//改变时间的格式为  20161124
  getDateFormat(date) {
    var year = date.getFullYear() //获取年份
    var month =  date.getMonth()+1 //获取月份  0代表一月所以加1
    var day = date.getDate() //获取天
    var yearStr = year.toString()//转string
    var str = yearStr+month+day
    return str
  }
//用于加载更多
  onEndReached() {

    if (this.state.isLoadingMore) return; //正在加载更多的时候不让再加载，不然如果滑动快的话会重复加载

    this.setState({
      isLoadingMore: true,
    })

    var beforeDay = this.getBeforeDay(page) //page是当前页
    var day = this.getDateFormat(beforeDay);
    // console.log(day);
    let url = "http://news-at.zhihu.com/api/4/news/before/"+day
    //加载过往消息
    this.fetchBeforeNewsData(url)

  }
  fetchBeforeNewsData(url) {

    fetch(url)
    .then((response)=>{
      if (response.ok) {
            return response.json()
      } else {
            console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
      }
    })
    .then((responseData) => {
      //请求成功之后page+1
      page = page+1
      // console.log(responseData);
      // stories = stories.concat(responseData.stories)//数组合并

      allArr.push(responseData)
      var dataBlob = {},sectionIDs = [],rowIDs = [];
      for (var i = 0; i < allArr.length; i++) {
        sectionIDs.push(i) //第一个section
        dataBlob[i] = allArr[i].date; //时间
        // alert(JSON.stringify(allArr[i].date))
        // 3.设置该组中每条数据的结构
        rowIDs[i] = []

        rowStories = allArr[i].stories

        for (var j = 0; j < rowStories.length; j++) {
          //    改组中的每条对应的rowId
          rowIDs[i].push(j);
          // 把每一行中的内容放入dataBlob对象中
          dataBlob[i+':'+j] = rowStories[j]
        }
      }

      // Array.prototype.push.apply(stories, responseData.stories);//数组合并
      this.setState({//setState会触发一次重绘
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs),
        isLoadingMore: false,
      });
    })
    .catch((error) => {
        console.error('错误'+error);
    });
  }
  renderFooter() {
    if (this.state.isLoadingMore) {
      return(
        <View style = {{flex:1,backgroundColor:'#F5FCFF',alignItems: 'center',
        justifyContent: 'center',}}>
          <ActivityIndicator
            animating={true}
            style={{
              width: 80,
              height: 80,
            }}
            size="small" />
        </View>
      )
    }else {
      return null;
    }
  }
//试图滚动 触发的方法
  listViewScrolling() {

  }

  render() {

    if (Platform.OS === 'ios') {
      if (this.state.animating) {
        return (
          <View style = {{flex:1,backgroundColor:'#F5FCFF',alignItems: 'center',
          justifyContent: 'center',}}>
            <ActivityIndicator
              animating={this.state.animating}
              style={{
                width: 80,
                height: 80,
              }}
              size="small" />
          </View>
        )
      }else {
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
             onEndReached = {this.onEndReached}
             onEndReachedThreshold = {150} //离底部还有多远的时候开始加载更多
             renderFooter={this.renderFooter}
            // onScroll = {this.listViewScrolling.bind(this)}
             renderSectionHeader = {this.renderSectionHeader}
            >
            </ListView>
          </View>
        );
      }
    }else {
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
           onEndReached = {this.onEndReached}
           onEndReachedThreshold = {150} //离底部还有多远的时候开始加载更多
           renderFooter={this.renderFooter}
           renderSectionHeader = {this.renderSectionHeader}
          />
        </View>
      );
    }

    // alert(JSON.stringify(themesDataProps))
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorView: {
    width: window.width,
    backgroundColor: 'red',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'rgb(237, 240, 235)',//listView 背景色
  },
  homeTopScrollView: {
    flex: 1,
    height: 220,
  },
});

export default Home;
