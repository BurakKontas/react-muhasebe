import React,{ useState, useEffect } from 'react';
import { App } from '../Main';
import {
  Text
} from '../../components/Text' 
import { StyleSheet, View, ScrollView, Button, TextInput } from "react-native";
import DropdownMenu from 'react-native-dropdown-menu';
import { CheckBox } from 'react-native-elements'
import colors from '../../constants/colors';
import { getDate } from '../../helpers/getDate';
import firebase from 'firebase/compat/app'
import { firestore } from '../../../App';
import { FIREBASE_CONFIG } from '../../../firebase.config';
import { getUser } from '../../helpers/getUser';
import { emailCleaner } from '../../helpers/emailCleaner';
import { collection, getDocs } from 'firebase/firestore';
import { doc , setDoc} from 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

function email(){
  return emailCleaner(getUser().email)
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const SatisEkle = ({navigation}) => {
const [pending, setPending] = React.useState(true);
const [kasalarData, setKasalarData] = useState([[]])
const [daraData, setDaraData] = useState([])
const [urunlerDataTurler, setUrunlerDataTurler] = useState([[]])
const [urunlerData0, setUrunlerData0] = useState([[]])
const [urunlerData1, setUrunlerData1] = useState([[]])
const [kisilerData, setKisilerData] = useState([[]])
const [boyutlarData, setBoyutlarData] = useState([[]])

var kasalar = [[]]
var kasalarDara = []
var urunler = []
var urunlerTurler = []
var kisiler = [[]]
var boyutlar = [[]]
useEffect(() => {
  const timeout = setTimeout(() => {
    const collectionRef = collection(firestore,`data/${email()}/kasa`);
    getDocs(collectionRef).then((response) => {
      response.docs.map((item) => {
        kasalarDara.push(item.data().dara)
        kasalar[0].push(item.data().isim)
      })
      if(kasalar[0].length != 0) setDaraData(kasalarDara)
      if(kasalar[0].length != 0) setKasalarData(kasalar)
      if(kasalar[0].length != 0) setKasa({value:kasalar[0][0],row:0})
  })
  const collectionRef2 = collection(firestore,`data/${email()}/urun`);
  getDocs(collectionRef2).then((response) => {
    response.docs.map((item) => {
      urunler.push(item.data().isim)
      urunlerTurler.push(item.data().turler)
    })
    if(urunler.length != 0)setUrunlerData0(urunler)
    if(urunler.length != 0)setUrunlerData1(urunlerTurler[0])
    if(urunler.length != 0)setUrunlerDataTurler(urunlerTurler)
    if(urunler.length != 0)setUrunIsim({value:urunler[0]})
    if(urunler.length != 0)setUrunTur({value:urunlerTurler[0][0]})
})
  setTimeout(() => {
    setDara(kasalarDara[0])//datalar bir yerine otursun emi
  },500)
  setPending(false);
  },2000)
  const collectionRef = collection(firestore,`data/${email()}/kisi`);
  getDocs(collectionRef).then((response) => {
    response.docs.map((item) => {
      kisiler[0].push(item.data().unvan)
    })
    if(kisiler[0].length != 0)setKisilerData(kisiler)
    if(kisiler[0].length != 0)setAlici({value:kisiler[0][0]})
    if(kisiler[0].length != 0)setIsim({value:kisiler[0][0]})
})
const collectionRef2 = collection(firestore,`data/${email()}/boyut`);
getDocs(collectionRef2).then((response) => {
  response.docs.map((item) => {
    boyutlar[0].push(item.data().boyut)
  })
  if(boyutlar[0].length != 0)setBoyutlarData(boyutlar)
  if(boyutlar[0].length != 0)setBoyut({value:boyutlar[0][0]})
})
  return () => clearTimeout(timeout);
}, []);

const [urunIsim, setUrunIsim] = useState({value:""})
const [urunTur, setUrunTur] = useState({value:""})
const [isim, setIsim] = useState({value:""})
const [dara, setDara] = useState()
const [adet, setAdet] = useState({value:0})
const [KG, setKG] = useState({value:0})
const [boyut, setBoyut] = useState({value:""})
const [kasa, setKasa] = useState({value:"",row:""})
const [fiyat, setFiyat] = useState({value:0})
const [alici, setAlici] = useState({value:""})

const [KGError, setKGError] = useState(0)
const [boyutError, setBoyutError] = useState(0)
const [kisiError, setKisiError] = useState(0)
const [adetError, setAdetError] = useState(0)
const [kasaError, setKasaError] = useState(0)
const [fiyatError, setFiyatError] = useState(0)
const [aliciError, setAliciError] = useState(0)


const [boyutSelector, setBoyutSelector] = useState(true)
const [kisiSelector, setKisiSelector] = useState(true)
const [aliciSelector, setAliciSelector] = useState(true)

const [alim, setAlim] = useState(false)
const [sonText, setSonText] = useState(" ")

const [errorOP, setErrorOP] = useState(0)

const net = () => {
  var varDara = dara*adet.value;
  var varKG = KG.value; 
  return (varKG-varDara)
}

const toplam = () => {
  var varFiyat = fiyat.value;
  if(isNaN(fiyat.value)) varFiyat = 0;
  return (net()*varFiyat)
}

const onSubmit = () => {
  var error = false
  if(isim.value == "Seçiniz" || isim.value == "") {
    setKisiError(1)
    setTimeout(() => {
      setKisiError(0)
    },2100)
    error = true
  }
  if(boyut.value == "Seçiniz" || boyut.value == "" || boyut.value == 0) {
    setBoyutError(1)
    setTimeout(() => {
      setBoyutError(0)
    },2100)
    error = true
  }
  if(adet.value == 0 || isNaN(adet.value)) {
    setAdetError(1)
    setTimeout(() => {
      setAdetError(0)
    },2100)
    error = true
  }
  if(KG.value == 0 || isNaN(KG.value)) {
    setKGError(1)
    setTimeout(() => {
      setKGError(0)
    },2100)
    error = true
  }
  if(fiyat.value == 0 || isNaN(fiyat.value)) {
    setFiyatError(1)
    setTimeout(() => {
      setFiyatError(0)
    },2100)
    error = true
  }
  if(kasa.value == "Seçiniz" || kasa.value == "") {
    setKasaError(1)
    setTimeout(() => {
      setKasaError(0)
    },2100)
    error = true
  }
  if(alici.value == "Seçiniz" || kasa.value == "") {
    setAliciError(1)
    setTimeout(() => {
      setAliciError(0)
    },2100)
    error = true
  }
  var output;
  var sayi = randomInt(0,10000)
  if(alim) {
  var output = {
    tarih:getDate(),
    uretici:isim.value,
    urun:urunIsim.value,
    tur:urunTur.value,
    boyut:boyut.value,
    adet:adet.value,
    kg:KG.value,
    kasa:kasa.value,
    dara:dara*adet.value,//kasadan çekilecek
    net:net(),
    fiyat:fiyat.value,
    toplam:toplam(),
    alim:"Alış",
    id:sayi,
}
} else {
  var output = {
    tarih:getDate(),
    uretici:isim.value,
    urun:urunIsim.value,
    tur:urunTur.value,
    boyut:boyut.value,
    adet:adet.value,
    kg:KG.value,
    kasa:kasa.value,
    dara:dara*adet.value,//kasadan çekilecek
    net:net(),
    fiyat:fiyat.value,
    toplam:toplam(),
    alici:alici.value,
    alim:"Satış",
    id:sayi,
  }
}
  if(error) {
    setErrorOP(1)
    setTimeout(() => {
      setErrorOP(0)
    },2000)
    return null
  } else {
  toDatabase(output)
  }
}

const toDatabase = (output) => {
  var pathLong = `data/${email()}/genel` 
  setDoc(doc(firestore,pathLong,`${output.id}`),output).then(() => {
  }).catch((err) => {
    console.log(err.message)
});
if(output.alim == "Alış") {
  var pathLong = `data/${email()}/alis` 
  setDoc(doc(firestore,pathLong,`${output.id}`),output).then(() => {
  }).catch((err) => {
    console.log(err.message)
});
} else {
  var pathLong = `data/${email()}/satis` 
  setDoc(doc(firestore,pathLong,`${output.id}`),output).then(() => {
  }).catch((err) => {
    console.log(err.message)
});
}
setKG({value:0})
setAdet({value:0})
setFiyat({value:0})
setSonText("İşlem Başarılı")
setTimeout(() => {
  setSonText(" ")
},2000)
}

const temp = 100  
const dropDownFlex = 0.34
  return (
    <App navigation={navigation}>
    { pending ? 
      <View style={[styles.containerStyle,{alignItems:"center",justifyContent:"center"}]}><Text>Yükleniyor</Text></View> 
      : 
      <View style={styles.containerStyle}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          <View style={styles.scrollSplit}>
            <Text style={[styles.header1]}>Üretici</Text>
            <CheckBox
              containerStyle={styles.checkBox}
              disabled={alim}
              center
              title='Üretici Girişini Elle Yap'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={kisiSelector}
              onPress={() => {setKisiSelector(!kisiSelector)}}
            />
            <View style={[styles.drowDown,{opacity:((kisiSelector) ? 1 : 0),flex:(kisiSelector ? dropDownFlex : 0),marginLeft:5}]}>
            <DropdownMenu
              disabled={alim}
              bgColor={'white'}
              tintColor={'#666666'}
              activityTintColor={'green'}
              // arrowImg={}      
              // checkImage={}   
              optionTextStyle={{color: '#333333'}}
              titleStyle={{color: '#333333'}} 
              maxHeight={134} 
              handler={(selection, row) => setIsim({value:kisilerData[selection][row]})}
              data={kisilerData}>{/*ürün listesinden çekilecek*/}
            </DropdownMenu>
            </View>
            <View style={{opacity:((kisiSelector) ? 0 : 1),flex:(kisiSelector ? 0 : dropDownFlex)}}>
            <TextInput 
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın
              disabled={alim}
              style={styles.textInput1}
              placeholder="Üretici Giriniz..."
              keyboardType='numeric'
              onChangeText={(text)=> setIsim({value:text})}
              value={isim.value}
              maxLength={10}  //setting limit of input
            /> 
            </View> 
            <Text style={[styles.header1,{marginTop:3}]}>Boyut</Text>
            <CheckBox
              containerStyle={styles.checkBox}
              center
              title='Boyut Girişini Elle Yap'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={boyutSelector}
              onPress={() => {setBoyutSelector(!boyutSelector)}}
            />
            <View style={[styles.drowDown,{opacity:(boyutSelector ? 1 : 0),flex:(boyutSelector ? dropDownFlex : 0),marginLeft:5}]}>
              <DropdownMenu
                bgColor={'white'}
                tintColor={'#666666'}
                activityTintColor={'green'}
                // arrowImg={}      
                // checkImage={}   
                optionTextStyle={{color: '#333333'}}
                titleStyle={{color: '#333333'}} 
                maxHeight={134} 
                handler={(selection, row) => {setBoyut({value:boyutlarData[selection][row]});console.log(boyutlarData[selection][row])}}
                data={boyutlarData}>{/*ürün listesinden çekilecek*/}
              </DropdownMenu>
              </View>
              <View style={{opacity:(boyutSelector ? 0 : 1),flex:(boyutSelector ? 0 : dropDownFlex),}}>
              <TextInput
                onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın 
                disabled={boyutSelector}
                style={styles.textInput1}
                placeholder="Boyut Giriniz..."
                onChangeText={(text)=> setBoyut({value:text})}
                value={boyut.value}
                maxLength={10}  //setting limit of input
              />
              </View>
            <Text style={[styles.header2,{marginTop:3}]}>Adet</Text>
            <TextInput
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın 
              style={styles.textInput2}
              placeholder="Adet Giriniz..."
              keyboardType='numeric'
              onChangeText={(text)=> setAdet({value:text})}
              value={adet.value}
              maxLength={10}  //setting limit of input
            /> 
            </View>
            <View style={[styles.scrollSplit]}>
            <Text style={[styles.header1,{marginTop:20}]}>Ürün</Text>
            <View style={[styles.drowDown,{opacity:1,flex:dropDownFlex,marginLeft:5,height:300}]}>
            <DropdownMenu
              bgColor={'white'}
              tintColor={'#666666'}
              activityTintColor={'green'}
              // arrowImg={}      
              // checkImage={}   
              optionTextStyle={{color: '#333333'}}
              titleStyle={{color: '#333333'}} 
              maxHeight={134} 
              handler={(selection, row) => {
                if(selection == 0) {
                  setUrunlerData1(urunlerDataTurler[row])
                  setUrunIsim({value:urunlerData0[row]})
                  setUrunTur({value:urunlerDataTurler[row][0]})
                } else {
                  setUrunTur({value:urunlerData1[row]})
                }
              }}
              data={[urunlerData0,urunlerData1]}>{/*ürün listesinden çekilecek*/}
            </DropdownMenu>
            </View>
            <Text style={[styles.header2,{marginTop:temp+35}]}>KG</Text>
            <TextInput 
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın
              style={[styles.textInput2,]}
              placeholder="KG Giriniz..."
              keyboardType='numeric'
              onChangeText={(text)=> setKG({value:text})}
              value={KG.value}
              maxLength={10}  //setting limit of input
            />
            <Text style={styles.header3}>Fiyat</Text>
            <TextInput
              onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın 
              style={styles.textInput2}
              placeholder="Fiyat Giriniz..."
              keyboardType='numeric'
              onChangeText={(text)=> setFiyat({value:text})}
              value={fiyat.value}
              maxLength={10}  //setting limit of input
            />  
            <View  style={[styles.submitButton,{backgroundColor:"red"}]}>
            <Button
            onPress={onSubmit}
            title="Ekle"
            style={{padding:10}}
            />
            </View>
            </View>
            <View style={[styles.scrollSplit]}>
              <Text style={[styles.header2,{marginTop:20}]}>Kasa</Text>
            <View style={[styles.drowDown,{opacity:1,flex:dropDownFlex,marginLeft:5}]}>
              <DropdownMenu
                bgColor={'white'}
                tintColor={'#666666'}
                activityTintColor={'green'}
                // arrowImg={}      
                // checkImage={}   
                optionTextStyle={{color: '#333333'}}
                titleStyle={{color: '#333333'}} 
                maxHeight={134} 
                handler={(selection, row) => {setKasa({value:kasalarData[selection][row],row:row});setDara(daraData[row])}}
                data={kasalarData}>{/*ürün listesinden çekilecek*/}
              </DropdownMenu>
              </View>
              <Text style={[styles.header2,{marginTop:70}]}>Alıcı</Text>
            <CheckBox
              containerStyle={styles.checkBox}
              disabled={alim}
              center
              title='Alıcı Girişini Elle Yap'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={aliciSelector}
              onPress={() => {setAliciSelector(!aliciSelector)}}
            />
            <View style={[styles.drowDown,{opacity:((aliciSelector && !alim) ? 1 : 0),flex:(aliciSelector ? dropDownFlex : 0),marginLeft:5}]}>
              <DropdownMenu
                bgColor={'white'}
                tintColor={'#666666'}
                activityTintColor={'green'}
                // arrowImg={}      
                // checkImage={}   
                optionTextStyle={{color: '#333333'}}
                titleStyle={{color: '#333333'}} 
                maxHeight={134} 
                handler={(selection, row) => setAlici({value:kisilerData[selection][row]})}
                data={kisilerData}>{/*ürün listesinden çekilecek*/}
              </DropdownMenu>
              </View>
              <View style={{opacity:(((aliciSelector && alim) || aliciSelector) ? 0 : 1),flex:(aliciSelector ? 0 : dropDownFlex),}}>
              <TextInput
                onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onSubmit() }}//enter e basılırsa yine buttona basılmış gibi saysın 
                disabled={alim}
                style={styles.textInput1}
                keyboardType='numeric'
                placeholder="Alıcı Giriniz..."
                onChangeText={(text)=> setAlici({value:text})}
                value={alici.value}
                maxLength={10}  //setting limit of input
              /> 
              </View>
              <CheckBox
              containerStyle={[styles.checkBox,{marginBottom:25,marginTop:50}]}
              center
              title='Alım'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={alim}
              onPress={() => {setAlim(!alim)}}
            />
            <Text>{sonText}</Text>
            </View>
            <Text style={[styles.errorText,{opacity:errorOP}]}>Hatalı Giriş: 
            <Text style={{opacity:kisiError}}>Kişi </Text>
            <Text style={{opacity:boyutError}}>Boyut </Text>
            <Text style={{opacity:adetError}}>Adet </Text>
            <Text style={{opacity:KGError}}>KG </Text>
            <Text style={{opacity:kasaError}}>Kasa </Text>
            <Text style={{opacity:fiyatError}}>Fiyat </Text>            
            <Text style={{opacity:aliciError}}>Alıcı </Text>
            </Text>
            <Text style={[styles.finalText,{marginTop:650}]}>Dara = {dara*adet.value} KG</Text>
            <Text style={styles.finalText}>NET = {net()} KG</Text>
            <Text style={[styles.finalText,{marginTop:700}]}>Toplam = ₺{toplam()}</Text>
        </ScrollView>
      </View>
    }
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
  scrollSplit:{
    flex:1/3,
    alignItems:'center'
  },
  checkBox:{
    width:"90%",
  },
  textInput1:{
    padding:10,    
    borderWidth:3,
    borderRadius:5,
    borderColor:colors.border,
    backgroundColor:colors.white,
    width:"100%",
    marginRight:300
  },
  drowDown:{
    width:"90%",
    marginRight:7
  },
  header1:{
    marginLeft:7,
    fontSize:18,
    fontWeight:"bold",
  },
  errorText:{
    color:colors.error,
    position:'absolute',
    marginTop:750
  },
  submitButton:{
    position:'absolute',
    marginTop:700,
  }, 
  textInput2:{
    padding:10,    
    borderWidth:3,
    borderRadius:5,
    borderColor:colors.border,
    backgroundColor:colors.white,
    width:"100%",
  },
  header2:{
    fontSize:18,
    fontWeight:"bold",
    marginTop:100,
  },
  header3:{
    fontSize:18,
    fontWeight:"bold",
    marginTop:190,
  },
  finalText:{
    color:colors.primary,
    fontWeight:"bold",
    position:'absolute',
    marginTop:675,
  }
});