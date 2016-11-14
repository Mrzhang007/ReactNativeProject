import React ,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  WebView,
} from 'react-native';

var headerUrl =  'http://daily.zhihu.com/story/';

export default class HomeDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
        style = {styles.webview}
        source = {{uri:headerUrl + this.props.newsData.id }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview:{
    flex: 1,
    marginTop: 64,
  }
});
