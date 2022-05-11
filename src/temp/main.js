import React from 'react'
import { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Picker,
} from 'react-native'

export const App = () => {
  const [menuFlex ,setmenuflex] = useState(0.27);
  const [pointMenu, setpointMenu] = useState(true);
  const [pointMenuOP, setpointMenuOP] = useState(0);

  const FmenuChange = () => {
    if(menuFlex == 1.5) {
    setmenuflex(0.27)
  } else {
    setmenuflex(1.5)
  }
  }

  const FpointMenu = () => {
    if(pointMenu) {
      setpointMenuOP(1.0)
    } else {
      setpointMenuOP(0.0)
    }
    setpointMenu(!pointMenu)
  }
    return (
      <View style={{flex:1,flexDirection: 'row'}}>{/*Outer div*/}
      <View style={{flex:(menuFlex),backgroundColor:"#FFB",alignItems: 'flex-start',justifyContent: 'flex-start'}}>
      <TouchableOpacity
        onPress = {FmenuChange}
        style={{alignItems: 'center',marginBottom: 10,flexDirection: 'row'}}>
        <Image
        style={ styles.tinyLogo}
        source={{
          uri: 'https://w7.pngwing.com/pngs/451/380/png-transparent-hamburger-button-computer-icons-menu-menu-rectangle-desktop-wallpaper-button.png',}}/>         
          <Text style={{justifyContent:"center",alignItems: 'center'}}>{(menuFlex == 1.5) ? "   Menu" : " "}</Text>
      </TouchableOpacity>
      </View>
        <View style={styles.body}>
          <View style={styles.logo}>
            <View style={styles.logo1}>
              <Text>LOGO1</Text>
            </View>
            <View style={styles.logo2}>
              <Text>LOGO2</Text>
            </View>
          </View>
          <View style={styles.nav}>
            <Text>NAVIGATION</Text>
          </View>
          <View style={styles.content}>
          <Text>CONTENT</Text>
          <Picker
        style={{ height: 50, width: 150 }}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
          </View>
          <View style={styles.footer}>
            <Text>FOOTER</Text>
          </View>
        </View>
        <View style={styles.abs}>
        <TouchableOpacity
              disabled = {pointMenu}
              opacity = {pointMenuOP}
              backgroundColor="#FFA" 
              style={{opacity:pointMenuOP,paddingBottom:10,backgroundColor:"#BFA",alignItems: 'right',width:85,justifyContent: 'center',height:30}}>
              <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
              disabled = {pointMenu}
              opacity = {pointMenuOP}
              backgroundColor="#FFA"
              style={{opacity:pointMenuOP,paddingBottom:10,backgroundColor:"#ABF"}}>
              <Text>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
              onPress = {FpointMenu}
              style={{alignItems: 'center',marginBottom: 34,flexDirection: 'row'}}>
          <Image
            style={styles.absButton}
            source={{
              uri: 'https://w7.pngwing.com/pngs/451/380/png-transparent-hamburger-button-computer-icons-menu-menu-rectangle-desktop-wallpaper-button.png',}}/>         
        </TouchableOpacity>        
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  absButton:{
    width:30,
    height:30,
  },
  abs:{
    position:"absolute",
    justifyContent:"center",
    alignItems:"center",
    right:"0",
    bottom:"0",
    height:"9%",
    width:"5%",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  body: {
    flex: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo:{
    flex:0.5,
    flexDirection: 'row',
    backgroundColor: '#fbf',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }, 
  nav:{
    flex:0.75,
    backgroundColor: '#fab',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

  },
  content:{
    flex:6,
    backgroundColor: '#4BA',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

  },
  footer:{
    flex:0.5,
    backgroundColor: '#FCA',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo1:{
    flex:0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F23',
    width: '100%',
    height:"100%"
  },
  logo2:{
    flex:0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F29',
    width: '100%',
    height:"100%"
  }
});