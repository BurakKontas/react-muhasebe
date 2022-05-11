import React,{ useState } from 'react';
import { App } from '../Main';
import {
  Text
} from '../../components/Text' 
import { StyleSheet, View, ScrollView, Button, TextInput } from "react-native";
import colors from '../../constants/colors';

import firebase from 'firebase/compat/app'
import { getDate } from '../../helpers/getDate';
import { firestore } from '../../../App'
import { doc , setDoc} from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../../../firebase.config';
import { getUser } from '../../helpers/getUser';
import { emailCleaner } from '../../helpers/emailCleaner';

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
}

function email(){
  return emailCleaner(getUser().email)
}

export const BoyutEkle = ({navigation}) => {

const [boyut, setBoyut] = useState({value:""})
const [okMessage, setOkMessage] = useState()

const [errorOP, setErrorOP] = useState(0)
const [boyutError, setBoyutError] = useState(0)

const onSubmit = () => {
  var error = false
  if(boyut.value == "") {
    setBoyutError(1)
    setTimeout(() => {
      setBoyutError(0)
    },2100)
    error = true
  }
  const output = {
    tarih:getDate(),
    boyut:boyut.value,
  }
  if(error) {
    setErrorOP(1)
    setTimeout(() => {
      setErrorOP(0)
    },2000)
    return null
  } else {
  var pathLong = `data/${email()}/boyut/` 
    setDoc(doc(firestore,pathLong,`${boyut.value}`),output).then(() => {
    }).catch((err) => {
      console.log(err.message)
  });
  setOkMessage(`Boyut:(${boyut.value}) Eklendi`)
  setTimeout(() => {
    setOkMessage("")
  },2000)
  setBoyut({value:""})
  return output
  }
}
  return (
    <App navigation={navigation}>
      <View style={styles.containerStyle}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={[styles.scrollSplit,{marginLeft:500,marginTop:300}]}>
        <Text style={styles.header1}>Boyut</Text>
            <TextInput 
              style={styles.textInput1}
              placeholder="Boyut İsmini Giriniz..."
              onChangeText={(text)=> setBoyut({value:text})}
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın
              value={boyut.value}
            /> 
        </View>
        <View style={[styles.scrollSplit,{marginTop:0}]}>
        <View style={styles.submitButton}>
        <Button title={"Ekle"} onPress={onSubmit}></Button>
        <Text>{okMessage}</Text>
        </View>
        </View>
        <View style={styles.scrollSplit}>
        </View>
        <Text style={[styles.errorText,{opacity:errorOP}]}>Hatalı Giriş:  
            <Text style={{opacity:boyutError}}>Boyut </Text>
        </Text>
        </ScrollView>
      </View>
    </App>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 10,
    color:"black"
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    flexDirection:"row",
    margin:30,
    backgroundColor:"lightgray"
  },
  errorText:{
    position:"absolute",
    martinTop:750,
    color:colors.error,
  },
  textInput1:{
    padding:10,    
    borderWidth:3,
    borderRadius:5,
    borderColor:colors.border,
    backgroundColor:colors.white,
    width:"100%",
  },
  header1:{
    marginLeft:7,
    fontSize:18,
    fontWeight:"bold",
  },
  scrollSplit:{
    flex:1/3,
    alignItems:'center'
  },
  submitButton:{
    marginTop:330,
    marginRight:300
  },
});