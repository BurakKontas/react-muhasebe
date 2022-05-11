import React,{ useState } from 'react';
import { App } from './Main';
import {
  Text
} from '../components/Text' 
import { StyleSheet, View, ScrollView, Button, TextInput } from "react-native";
import colors from '../constants/colors';

import firebase from 'firebase/compat/app'
import { getDate } from '../helpers/getDate';
import { firestore } from '../../App'
import { doc , setDoc} from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../../firebase.config';
import { getUser } from '../helpers/getUser';
import { emailCleaner } from '../helpers/emailCleaner';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }  

export const Admin = ({navigation}) => {

const [ad, setAd] = useState({value:""})
const [soyad, setSoyad] = useState({value:""})
const [email, setEmail] = useState({value:""})
const [password, setPassword] = useState({value:""})
const [okMessage, setOkMessage] = useState()

const [errorOP, setErrorOP] = useState(0)
const [soyadError, setSoyadError] = useState(0)
const [adError, setAdError] = useState(0)
const [emailError, setEmailError] = useState(0)
const [passwordError, setPasswordError] = useState(0)


const onSubmit = () => {
  var error = false
  if(ad.value == "") {
    setAdError(1)
    setTimeout(() => {
      setAdError(0)
    },2100)
    error = true
  }
  if(soyad.value == "") {
    setSoyadError(1)
    setTimeout(() => {
      setSoyadError(0)
    },2100)
    error = true
  }
  if(email.value == "") {
    setEmailError(1)
    setTimeout(() => {
      setEmailError(0)
    },2100)
    error = true
  }
  if(password.value == "") {
    setPasswordError(1)
    setTimeout(() => {
      setPasswordError(0)
    },2100)
    error = true
  }
  const output = {
    tarih:getDate(),
    name:ad.value,
    surname:soyad.value,
    password:password.value,
    email:email.value,
    authority:"user"
  }
  const output2 = {
    tarih:getDate(),
    name:ad.value,
    surname:soyad.value,
    password:password.value,
    email:email.value,
    authority:"user",
    id:`${randomInt(0,10000)}`
  }
  if(error) {
    setErrorOP(1)
    setTimeout(() => {
      setErrorOP(0)
    },2000)
    return null
  } else {
  var pathLong = `loginData/${emailCleaner(email.value)}/data` 
    setDoc(doc(firestore,pathLong,`PersonalData`),output).then(() => {
    }).catch((err) => {
      console.log(err.message)
  });
  var pathLong = `email` 
  setDoc(doc(firestore,pathLong,`${output2.id}`),output2).then(() => {
  }).catch((err) => {
    console.log(err.message)
});
  setOkMessage(`Ad:(${ad.value}) Soyad:(${soyad.value}) Email:(${email.value}) Şifre:(${password.value})`)
  setTimeout(() => {
    setOkMessage("")
  },5000)
  setAd({value:""})
  setPassword({value:""})
  setSoyad({value:""})
  setEmail({value:""})
  setTimeout(() => {
    const auth = getAuth();
    const user = auth.currentUser
    createUserWithEmailAndPassword(auth, email.value, password.value)
    setTimeout(() => {
        auth.updateCurrentUser(user)
    },1000)
  },4000)
  return output
  }
}
  return (
    <App navigation={navigation}>
      <View style={styles.containerStyle}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={[styles.scrollSplit,{marginLeft:300,marginTop:300}]}>
        <Text style={styles.header1}>Ad</Text>
            <TextInput 
              style={styles.textInput1}
              placeholder="İsim Giriniz..."
              onChangeText={(text)=> setAd({value:text})}
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın
              value={ad.value}
            />
        <Text style={styles.header1}>Email</Text>
            <TextInput 
              style={styles.textInput1}
              placeholder="Email Giriniz..."
              onChangeText={(text)=> setEmail({value:text})}
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın
              value={email.value}
            />
        </View>
        <View style={[styles.scrollSplit,{marginTop:300}]}>
        <Text style={styles.header1}>Soyad</Text>
            <TextInput 
              style={styles.textInput1}
              placeholder="Soyad Giriniz..."
              onChangeText={(text)=> setSoyad({value:text})}
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın
              value={soyad.value}
            />
        <Text style={styles.header1}>Şifre</Text>
            <TextInput 
              style={styles.textInput1}
              placeholder="Şifre Giriniz..."
              onChangeText={(text)=> setPassword({value:text})}
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın
              value={password.value}
            /> 
        </View>
        <View style={styles.scrollSplit}>
        <View style={styles.submitButton}>
        <Button title={"Ekle"} onPress={onSubmit}></Button>
        </View>
        <Text>{okMessage}</Text>
        </View>
        <Text style={[styles.errorText,{opacity:errorOP}]}>Hatalı Giriş:  
            <Text style={{opacity:adError}}>Ünvan </Text>
            <Text style={{opacity:soyadError}}>Soyad </Text>
            <Text style={{opacity:passwordError}}>Vergi Dairesi No </Text>
            <Text style={{opacity:emailError}}>Email </Text>
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