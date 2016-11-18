import React , { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native'

const titleColor_nomal = 'rgba(124,129,134,1)'
const imageuri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

export default class SideMenuTopButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
        buttonResourse,
    } = this.props;

    return(
      <TouchableOpacity>
      <View style = {styles.container}>
        <Image style = {styles.buttonImage}  source = {{uri:imageuri}}/>
        <Text style = {styles.buttonTitle}>{buttonResourse[0]}</Text>
      </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      width: 70,
      height: 125-64,
      // backgroundColor: 'green',
      alignItems: 'center',    //左右居中
    },
    buttonImage: {
      marginTop: 15,
      width: 20,
      height: 20,
      backgroundColor: 'red'
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
