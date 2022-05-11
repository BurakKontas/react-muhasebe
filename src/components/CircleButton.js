import React, { useState }from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { Text } from './Text';

import colors from '../constants/colors';

const styles = StyleSheet.create({
    absButton:{
        width:30,
        height:30,
        position:"absolute",
      },
      abs:{
        flexDirection:"row",
        position:"absolute",
        marginRight:30,
        alignItems:"center",
      },
});

export const CircleButton = () => {
  const [pointMenu, setpointMenu] = useState(true);
  const [pointMenuOP, setpointMenuOP] = useState(0);

  const FpointMenu = () => {
    if(pointMenu) {
      setpointMenuOP(1.0)
    } else {
      setpointMenuOP(0.0)
    }
    setpointMenu(!pointMenu)
  }

  return (
    <View style={styles.abs}>
        <TouchableOpacity
              disabled = {pointMenu}
              opacity = {pointMenuOP}
              backgroundColor="#FFA" 
              style={{opacity:pointMenuOP,paddingBottom:10,backgroundColor:colors.background,alignItems: 'right',justifyContent: 'center',marginRight:10}}>
              <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
              disabled = {pointMenu}
              opacity = {pointMenuOP}
              backgroundColor="#FFA"
              style={{opacity:pointMenuOP,paddingBottom:10,backgroundColor:colors.background,marginRight:20}}>
              <Text>Support</Text>
        </TouchableOpacity>   
        <TouchableOpacity
              onPress = {FpointMenu}
              style={{alignItems: 'center',marginBottom: 34,borderRadius:50,backgroundColor:"lightgray",width:30,height:30,marginTop:30}}>
        </TouchableOpacity>     
    </View>
  );
};
