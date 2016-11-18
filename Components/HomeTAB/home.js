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
} from 'react-native';


import {Actions} from 'react-native-router-flux'
import HomeTopScrollView from './homeTopScrollView'

var DataURL =  new Request('http://news-at.zhihu.com/api/4/news/latest');

var top_stories = []   //图片轮播

class Home extends Component {
  constructor(props) {
    // console.log(props.myProp);
    super(props);
    this.fetchNewsData = this.fetchNewsData.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      animating: true,
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
      console.log('数据');
      top_stories = responseData.top_stories
      // console.log(top_stories);
      this.setState({//setState会触发一次重绘
        dataSource: this.state.dataSource.cloneWithRows(responseData.stories),
        animating: false,
      });
      return responseData
    })
    .catch((error) => {
        console.error('错误'+error);
    });
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


//传递方法
  // static propTypes = {
  //   dataChanged: React.PropTypes.func.isRequired,
  // };

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
            />
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
    // marginBottom: 49,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height-49,
  },
  listContainer: {
    backgroundColor: 'rgb(237, 240, 235)',//listView 背景色
  },
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

export default Home;
