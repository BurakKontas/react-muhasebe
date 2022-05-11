import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Text } from '../components/Text';
import { App } from './Main'

import colors from '../constants/colors';

export const Destek = ({navigation}) => {
  return (
    <App navigation={navigation}>
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      <View style={{justifyContent:"center",alignContent:"center",alignItems:"center",borderWidth:3,borderColor:"lightgray",borderRadius:50,width:"30%",height:"30%",marginLeft:500,backgroundColor:"#FFA"}}>
        <Text type={"subheader"} style={styles.text}>Arda Burak Kontaş</Text>
        <Text type={"subheader"} style={styles.text}>İletişim:</Text>
        <Text type={"subheader"} style={styles.text}>E-Mail: aburakkontas@trakya.edu.tr</Text>
      </View>
      </ScrollView>
    </View>
    </App>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 10,
    width:3000,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    margin:50,
  },
  text:{
      color:colors.primary
  }
});