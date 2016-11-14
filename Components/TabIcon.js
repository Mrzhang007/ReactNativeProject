import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  // title: PropTypes.string,
};

const TabIcon = (props) => (
  <View  style = {{
    // justifyContent: 'center',
    flex: 1,
    alignItems: 'center',//横向
}}>
{/*//虚线*/}
  {/*<View
  style = {{width: Dimensions.get('window').width/2,height: 0.5,backgroundColor :'gray',marginTop: 0}}
  >
  </View>*/}
  <Image
  style = {{ marginTop: 1}}
  //source = {require('../icons/my_select.png')}
  source = {props.selected ? props.iconSelctedName : props.iconName}
  //{require('../icons/my_select.png')}
  //{{uri : "https://facebook.github.io/react/img/logo_og.png"}}

  >
  </Image>
  <Text
    style={{ color: props.selected ? 'rgba(252,130,36,1)' : 'black' ,marginTop : 3,fontSize:12}}
  >
    {props.headerTitle}
  </Text>
  </View>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
