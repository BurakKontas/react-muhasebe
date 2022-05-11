import React,{ useState } from 'react';
import {View, StyleSheet, ScrollView, Button} from 'react-native';
import { Text } from 'react-native-paper';
import { App } from '../Main'
import { TextInput } from '../../components/Form';

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

import colors from '../../constants/colors';

export const UrunEkle = ({navigation}) => {
  const [isim, setIsim] = useState("");
  const [tur,setTur] = useState("");
  const [errorText,setErrorText] = useState(" ");

  const submit = () => {
    if(isim == "" || tur == "") {
      setErrorText("Lütfen Her Yeri Doldurunuz")
      setTimeout(() => {
        setErrorText(" ")
      },2000)
      return
    }
    var dizi=[]
    tur.split("\n").forEach(m => {
      dizi.push(m)
    })
    const output = {
      isim:isim,
      turler:dizi,
    }

    var pathLong = `data/${email()}/urun` 
    setDoc(doc(firestore,pathLong,`${isim}`),output).then(() => {
    }).catch((err) => {
      console.log(err.message)
  });
  setIsim("")
  setTur("")
  }
  return (
    <App navigation={navigation}>
    <View style={styles.containerStyle}>
      <ScrollView
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={styles.scrollViewStyle}>
        <View style={{flex:1/2,justifyContent:'center',alignItems:"center",marginRight:300}}>
          <Text style={[styles.header,{marginTop:300}]}>İsim</Text>
          <TextInput
            style={styles.textInput}
            placeholder="İsim Giriniz"
            value={isim}
            onChangeText={text => setIsim(text)}
          />
          <Text style={styles.header}>Türler</Text>
          <TextInput
            style={[styles.textInput,{height:300}]}
            placeholder="Türleri Her Satıra Bir Tane Olacak Şekilde Ekleyiniz"
            value={tur}
            multiline={true}
            onChangeText={text => setTur(text)}//buraya enter ile ilerlemeyi eklemedim enter alt satıra geçmek için kullanılıyor
          />
          <Text style={{color:colors.error}}>{errorText}</Text>
        <Button title={"Ekle"} onPress={submit}></Button>
        <View style={{marginBottom:300}}></View>
        </View>
      </ScrollView>
    </View>
    </App>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 10,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    margin:50,
    justifyContent:"center",
    flexDirection:"column",
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
  },
  header:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:15,
  },
  textInput:{
    borderWidth:5,
    borderRadius:5,
    borderColor:colors.border,
    backgroundColor:colors.white,
    height:35,
    width:300
  },
  Button:{
  }
});