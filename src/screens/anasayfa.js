import React, {useState,useEffect} from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native'
import { List} from 'react-native-paper';
import { PricingCard } from 'react-native-elements';
import colors from '../constants/colors';
import { getDate } from '../helpers/getDate';
import { App } from './Main';
import firebase from 'firebase/compat/app'
import { firestore } from '../../App';
import { FIREBASE_CONFIG } from '../../firebase.config';
import { getUser } from '../helpers/getUser';
import { emailCleaner } from '../helpers/emailCleaner';
import { collection, getDocs } from 'firebase/firestore';
import { StackActions } from '@react-navigation/native';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

export function email(){
  return emailCleaner(getUser().email)
}
const oncelik = (deger) => {
  if(deger == 3) {
    return ("#FB6363")
  } else if (deger == 2) {
    return ("#F7FB63")
  } else {
    return("#77FB63")
  }
}

export const Anasayfa = ({navigation}) => {
  const [pending, setPending] = useState(true);
  const [odemeler, setOdemeler] = useState([])
  const [gunlukToplam, setGunlukToplam] = useState(0)
  const [aylikToplam, setAylikToplam] = useState(0)
  const [yillikToplam, setYillikToplam] = useState(0)

  const [gunlukAlis , setGunlukAlis] = useState(0)
  const [gunlukSatis, setGunlukSatis] = useState(0)
  const [aylikAlis , setAylikAlis] = useState(0)
  const [aylikSatis, setAylikSatis] = useState(0)
  const [yillikAlis , setYillikAlis] = useState(0)
  const [yillikSatis, setYillikSatis] = useState(0)
  const [todo, setTodo] = useState([])

  var tempTodo = []
  var tempOdemeler = []
  var gunluk = 0;
  var aylik = 0;
  var yillik = 0;
  var gunlukS = 0;
  var aylikS = 0;
  var yillikS = 0;
  var gunlukA = 0;
  var aylikA = 0;
  var yillikA = 0;
  useEffect(() => {
    const timeout = setTimeout(() => {
      const collectionRef = collection(firestore,`data/${email()}/alis`);
      getDocs(collectionRef).then((response) => {
        response.docs.map((item) => {
          tempOdemeler.push({
            date:item.data().tarih,
            islem:0,
            description:`${item.data().uretici} Adl?? Ki??iden ???${item.data().fiyat}'den ${item.data().net} KG ${item.data().tur} ${item.data().urun} Al??nd??.`
          })
        })
        setOdemeler(tempOdemeler)
    })
    const collectionRef3 = collection(firestore,`data/${email()}/todo`);
    getDocs(collectionRef3).then((response) => {
      response.docs.map((item) => {
        tempTodo.push(item.data())
      })
      setTodo(tempTodo)
  })
    const collectionRef2 = collection(firestore,`data/${email()}/genel`);
    getDocs(collectionRef2).then((response) => {
      response.docs.map((item) => {
        if(getDate() == item.data().tarih) {
        if(item.data().alim == "Sat????") {
          gunlukS++
          gunluk += item.data().toplam
        }
        else {
          gunlukA++
          gunluk -= item.data().toplam
        }
      }
      if(getDate().split(".")[1] == item.data().tarih.split(".")[1] && getDate().split(".")[2] == item.data().tarih.split(".")[2] ) {
        if(item.data().alim == "Sat????") {
          aylikS++
          aylik += item.data().toplam
        }
        else {
          aylikA++
          aylik -= item.data().toplam
        }
      }
      if(getDate().split(".")[2] == item.data().tarih.split(".")[2]) {
        if(item.data().alim == "Sat????") {
          yillikS++
          yillik += item.data().toplam
        }
        else {
          yillikA++
          yillik -= item.data().toplam
        }
      }
  })
  setGunlukToplam(gunluk)
  setAylikToplam(aylik)
  setYillikToplam(yillik)
  setGunlukAlis(gunlukA)
  setAylikAlis(aylikA)
  setYillikAlis(yillikA)
  setGunlukSatis(gunlukS)
  setAylikSatis(aylikS)
  setYillikSatis(yillikS)
});
    return () => clearTimeout(timeout);
  },2000);
  setPending(false);
}, []);


    return (
      <App navigation={navigation}>
      {(pending) ? <View style={[styles.body,{justifyContent:"center",alignContent:"center"}]}><Text>Y??kleniyor</Text></View> : 
            <View style={styles.body}>
              <View style={[{flexDirection:"column"},styles.content]}>
               <View style={[styles.innerContent]}>
                <View style={[styles.innerContent2,{backgroundColor:"#FBA",flex:1,margin:20,maxHeight:400,flexDirection:"row",paddingHorizontal:50}]}>
                <PricingCard
                  containerStyle={styles.pricingCard}
                  color={"#F6A"}
                  title="G??nl??k K??r"
                  price={`???${gunlukToplam}`}
                  info={[`${gunlukSatis} Sat????`, `${gunlukAlis} Al????`]}
                  infoStyle={{fontSize:18}}
                  button={{ title:' Ayr??nt??lar'}}
                  onButtonPress={() => {navigation.push("satis-goruntule")}}
                />
                <PricingCard
                  containerStyle={styles.pricingCard}
                  color={"#DAF"}
                  title="Ayl??k K??r"
                  price={`???${aylikToplam}`}
                  info={[`${aylikSatis} Sat????`, `${aylikAlis} Al????`]}
                  infoStyle={{fontSize:18}}
                  button={{ title:' Ayr??nt??lar'}}
                  onButtonPress={() => {navigation.push("satis-goruntule")}}
                />
                 <PricingCard
                  containerStyle={styles.pricingCard}
                  color={"#B9A"}
                  title="Y??ll??k K??r"
                  price={`???${yillikToplam}`}
                  info={[`${yillikSatis} Sat????`, `${yillikAlis} Al????`]}
                  infoStyle={{fontSize:18}}
                  button={{ title:' Ayr??nt??lar'}}
                  onButtonPress={() => {navigation.push("satis-goruntule")}}
                />
                </View>
              </View>
              <View style={[styles.innerContent]}>
                <View style={[styles.innerContent2,{backgroundColor:"#FBA",marginHorizontal:20,marginTop:20,maxHeight:400}]}>
                <ScrollView showsHorizontalScrollIndicator={false} style={[styles.innerContent2,{maxHeight:400,maxWidth:850,backgroundColor:"#FBA",marginHorizontal:10,marginTop:-10}]}>
                <List.Section>
                <List.Subheader style={{fontWeight:"bold",fontSize:18}}>??denecekler</List.Subheader>
                {(odemeler.length != 0) ?
                  odemeler.map((item) => {
                  return (<List.Item left={props => <List.Icon {...props} icon={{uri:"https://img.icons8.com/external-those-icons-lineal-those-icons/344/external-briefcase-business-those-icons-lineal-those-icons-1.png"}} />} onPress={() => {navigation.push("odeme")}} title={item.date} style={[styles.todo,{backgroundColor:(item.islem == 1) ? "#9cfc5b" : "#fc5b70"}]} description={item.description} />);
                  })
                  :
                  <Text style={{color: colors.primary,fontSize: 16,fontWeight:"bold",marginLeft:15}}>Herhangi Bir ??demeniz Yok</Text>
                }
                </List.Section>
                </ScrollView>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} style={[styles.innerContent2,{maxHeight:400,maxWidth:850,backgroundColor:"#FBA",marginHorizontal:10,marginTop:20,paddingLeft:30}]}>
                <List.Section>
                <List.Subheader style={{fontWeight:"bold",fontSize:18}}>Yap??lacaklar</List.Subheader>
                {(todo.length != 0) ? 
                  todo.map((item) => {
                  return (<List.Item left={props => <List.Icon {...props} icon={{uri:"https://img.icons8.com/ios/344/todo-list--v1.png"}} />} onPress={() => {navigation.push("yapilacaklar")}} title={item.tarih} style={[styles.todo,{backgroundColor:oncelik(item.prio)}]} description={item.todo} />);
                  })
                  :
                  <Text style={{color: colors.primary,fontSize: 16,fontWeight:"bold",marginLeft:15}}>Yap??lacak Bir??eyiniz Yok</Text>
                }
                </List.Section>
                </ScrollView>
              </View>
            </View>
          </View>
        }
      </App>
    )
}

const styles = StyleSheet.create({
  body: {
    flex: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  nav:{
    flex:0.1,
    backgroundColor: colors.border,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height:'100%'

  },
  innerNav:{
    flex:1/3,
    height:"100%"
  },
  content:{
    flex:6,
    backgroundColor: colors.background,
    width: '100%',

  },
  subMenu:{
    flex:1.5,
    flexDirection:"column",
  },
  innerContent:{
    flex:0.5,
    flexDirection:"row",
    height:"100%",
    width:"100%",

  },
  innerContent2:{
    flex:0.5,
    height:"100%",
    width:"100%",
    borderRadius:30,
    padding:10,
  },
  subMenuInner:{
    height:30,
  },
  subInnerItem:{
    borderWidth:0.5,
    height:50,
  },
  subInnerText:{
    paddingLeft:35,//submen?? ekle ????kar sa??a kayd??rma
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  todo:{
    borderWidth:0,
    borderRadius:10,
    marginTop:10,
    marginRight:30,
    marginLeft:10,
  },
  pricingCard:{
    width:482,
    borderWidth:0.5,
    borderRadius:10,
    
  }
  
});