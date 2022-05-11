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

export const KisiEkle = ({navigation}) => {

const [adres, setAdres] = useState({value:""})
const [unvan, setUnvan] = useState({value:""})
const [vergiNo, setVergiNo] = useState({value:""})
const [tel, setTel] = useState({value:""})
const [okMessage, setOkMessage] = useState()

const [errorOP, setErrorOP] = useState(0)
const [unvanError, setUnvanError] = useState(0)
const [adresError, setAdresError] = useState(0)
const [vergiNoError, setVergiNoError] = useState(0)
const [telError, setTelError] = useState(0)


const onSubmit = () => {
  var error = false
  if(unvan.value == "") {
    setUnvanError(1)
    setTimeout(() => {
      setUnvanError(0)
    },2100)
    error = true
  }
  if(adres.value == "") {
    setAdresError(1)
    setTimeout(() => {
      setAdresError(0)
    },2100)
    error = true
  }
  if(tel.value == "") {
    setTelError(1)
    setTimeout(() => {
      setTelError(0)
    },2100)
    error = true
  }
  if(vergiNo.value == "") {
    setVergiNoError(1)
    setTimeout(() => {
      setVergiNoError(0)
    },2100)
    error = true
  }
  const output = {
    tarih:getDate(),
    unvan:unvan.value,
    adres:adres.value,
    vergiNo:vergiNo.value,
    tel:tel.value
  }
  if(error) {
    setErrorOP(1)
    setTimeout(() => {
      setErrorOP(0)
    },2000)
    return null
  } else {
  var pathLong = `data/${email()}/kisi` 
    setDoc(doc(firestore,pathLong,`${unvan.value}`),output).then(() => {
    }).catch((err) => {
      console.log(err.message)
  });
  setOkMessage(`Unvan:(${unvan.value}) Adres:(${adres.value}) Telefon:(${tel.value}) Vergi Dairesi No:(${vergiNo.value})`)
  setTimeout(() => {
    setOkMessage("")
  },5000)
  setUnvan({value:""})
  setVergiNo({value:""})
  setAdres({value:""})
  setTel({value:""})
  return output
  }
}
  return (
    <App navigation={navigation}>
      <View style={styles.containerStyle}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={[styles.scrollSplit,{marginLeft:300,marginTop:300}]}>
        <Text style={styles.header1}>Ünvan</Text>
            <TextInput 
              style={styles.textInput1}
              placeholder="Ünvan Giriniz..."
              onChangeText={(text)=> setUnvan({value:text})}
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın
              value={unvan.value}
            />
            <Text style={styles.header1}>Vergi Dairesi No</Text>
            <TextInput 
              style={styles.textInput1}
              placeholder="Vergi Dairesi No Giriniz..."
              onChangeText={(text)=> setVergiNo({value:text})}
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın
              value={vergiNo.value}
            /> 
        </View>
        <View style={[styles.scrollSplit,{marginTop:300}]}>
        <Text style={styles.header1}>Adres</Text>
            <TextInput 
              style={styles.textInput1}
              placeholder="Adres Giriniz..."
              onChangeText={(text)=> setAdres({value:text})}
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın
              value={adres.value}
            />
            <Text style={styles.header1}>Telefon</Text>
            <TextInput 
              style={styles.textInput1}
              placeholder="Telefon Giriniz..."
              onChangeText={(text)=> setTel({value:text})}
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın
              value={tel.value}
            />
        </View>
        <View style={styles.scrollSplit}>
        <View style={styles.submitButton}>
        <Button title={"Ekle"} onPress={onSubmit}></Button>
        </View>
        <Text>{okMessage}</Text>
        </View>
        <Text style={[styles.errorText,{opacity:errorOP}]}>Hatalı Giriş:  
            <Text style={{opacity:unvanError}}>Ünvan </Text>
            <Text style={{opacity:adresError}}>Adres </Text>
            <Text style={{opacity:vergiNoError}}>Vergi Dairesi No </Text>
            <Text style={{opacity:telError}}>Telefon </Text>
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