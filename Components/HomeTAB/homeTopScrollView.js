import React ,{ Component }  from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,//获取窗口的宽高
  TouchableOpacity,
  InteractionManager,//定时器
} from 'react-native';
//顶部的scrollView
import Swiper from 'react-native-swiper'

const windowWidth = Dimensions.get('window').width;
const HEIGHT = 220;

const styles = StyleSheet.create({
  wrapper: {
    height: HEIGHT,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    flex: 1,
    height: HEIGHT,
  },
  headeTitle: {
    flex: 1,
    marginTop: 145,
    marginLeft: 15,
    marginRight: 15,
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '900',
  }
});

const IMAGES = ['http://pic4.zhimg.com/35ed39ab3f43884bb4df46a86b6d29af.jpg','http://pic3.zhimg.com/153d2152582a39543f60cae2aebbbca2.jpg','http://pic2.zhimg.com/a50fd248295498839756e16f33616df9.jpg','http://pic1.zhimg.com/0f64f4f208ba11e424ccc9c9c9114aa0.jpg']

export default class HomeTopScrollView  extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
        imagesResourse,
    } = this.props;

    return(
      <Swiper style={styles.wrapper} height={HEIGHT}
          //onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          autoplay = {true}
          dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />}
          activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />}
          paginationStyle={{
            bottom: 10
          }}
          loop = {true}>

          {
          this.props.imagesResourse.map((data,index) => {
            return (
              //这里必须每个都加key
              <View style={styles.slide}  key = {index} >
                <Image  key={data.image} resizeMode='stretch' style={styles.image} source={{uri:data.image}}>
                  <Text style = {styles.headeTitle} numberOfLines={0}>{data.title}</Text>
                </Image>
              </View>
            );
          })
          }
      </Swiper>

    );
  }
  // renderImage(data) {
  //   return (
  //     <View style={styles.slide} >
  //       <Image resizeMode='stretch' style={styles.image} source={{uri:this.props.imagesResourse[0].image}}>
  //         <Text style = {styles.headeTitle} numberOfLines={0}>路边摊的那些画像的都是大神马？还是谁都可以！</Text>
  //       </Image>
  //     </View>
  //   );
  // }
}
