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

import {Actions} from 'react-native-router-flux';

var themesName;

export default class ThemesDaily extends Component {
  constructor(props) {
    console.log(props);
    themesName = props.themesDataProps.name


    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
    this.renderRow = this.renderRow.bind(this);
  }

//相当于ViewDidLoad
  componentDidMount() {//React会在react-native组件加载完成后，使用componentDidMount方法发送请求，并且只发送一次。
    // this.fetchNewsData();
    let URL = 'http://news-at.zhihu.com/api/4/theme/'+this.props.themesDataProps.id
    this.fetchNewsData(URL);
  }
  // //  设置数据
  fetchNewsData(url) {
    fetch(url)
    .then((response)=>response.json())
    .then((responseData) => {
      console.log(responseData);
      this.setState({//setState会触发一次重绘
        dataSource: this.state.dataSource.cloneWithRows(responseData.stories),
      });
    })
  }

  cellSelected(rowData){
    Actions.HomeDetailKey({newsData: rowData})
  }


  //  渲染cell
  renderRow(rowData) {

    if (!rowData.images) {
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
          // marginTop : 50,
          flex: 1,
           height: 90,
           flexDirection: 'row',
           backgroundColor: 'white',
        }}>
        <Text
        style = {{
          marginTop: 15,
          marginLeft: 15,
          marginRight: 15,
          height:60,
          color: 'black',
          fontSize: 16,
          fontWeight: 'normal',
          // backgroundColor: 'blue',
          fontFamily: 'Helvetica Neue',
        }}>
          {rowData.title}
        </Text>
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
    }else {
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
           flex:1,
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
          marginLeft: 25,
          marginRight: 15,
          width: 75,
          height: 60,
          // backgroundColor: 'rgba(100,100,200,1)'
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

  //传递方法
  // static propTypes = {
  //   themesDataProps: React.PropTypes.object.isRequired,
  // };

  render() {
    if (this.props.themesDataProps.name != themesName) {
        this.fetchNewsData('http://news-at.zhihu.com/api/4/theme/'+this.props.themesDataProps.id)
        themesName =  this.props.themesDataProps.name
    }
    return (
      <View style={styles.container}>
        <View style = {{backgroundColor: 'rgba(239,239,242,1)',height: 64}}>
          <Text style = {{flex:1,lineHeight: 44,marginTop: 20,alignItems:'center',textAlign:'center',fontSize:17,}}>
          {this.props.themesDataProps.name}
          </Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex:1,
    // marginTop: 100,
    backgroundColor: 'white',//listView 背景色
  },
  rowSeparator: {


    height: 1,
  },
});
