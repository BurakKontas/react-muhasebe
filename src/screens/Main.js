import React from 'react'
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native'
import {  List, FAB } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import { collection, getDocs } from 'firebase/firestore';
import { StackActions } from '@react-navigation/native';

import { Text } from '../components/Text';
import colors from '../constants/colors';
import { emailCleaner } from '../helpers/emailCleaner'
import { getUser } from '../helpers/getUser';
import { firestore } from '../../App';


export const App = ({navigation , children}) => {
  const route = useRoute()
  const [expanded, setExpanded] = useState(-1)  
  const [state, setState] = useState({ open: false });
  const [name, setName] = useState("")  
  const [surname, setSurName] = useState("")
  const [avatarURL , setAvatarURL] = useState("https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg")
  const [authority, setAuthority] = useState("user")

  const getLoginData = () => {
    const collectionRef = collection(firestore,`loginData/${emailCleaner(getUser().email)}/data`);
    getDocs(collectionRef).then((response) => {
        response.docs.map((item) => {
            setName(item.data().name)
            setSurName(item.data().surname)
            setAuthority(item.data().authority)
            if(item.data().avatarURL) setAvatarURL(item.data().avatarURL)
        })
    })
}
const navGoto = (screen) => {
  navigation.dispatch(StackActions.replace(`${screen}`))
}
  getLoginData()
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const handlePress = (index) => {
    if(index == expanded) {
      setExpanded(-1)
    } else {
    setExpanded(index)
    }
  }
    return (
      <View style={{flex:1,maxHeight:937,opacity:(name == "") ? 0 : 1}}>  
        {/*Navigation*/}
        {/*Logo*/}
        <View style={styles.nav}>
          <View style={[styles.innerNav,{paddingLeft:30,paddingBottom:30}]}>
            <TouchableOpacity style={{height:100,width:200}}>
            <Image
            style={{height:100,width:200}}
            source={{uri:'https://i.hizliresim.com/d2mwl3p.png'}}
            />
            </TouchableOpacity>
          </View>
          {/*Logo*/}
          <View style={styles.innerNav} />
          {/*Profile*/}
          <View style={[styles.innerNav,{justifyContent:"flex-end",flexDirection:'row'}]}>
            <TouchableOpacity 
              style={{marginRight:25,marginTop:10,width:64,height:64,borderRadius:90}}
              onPress={() => {}}>
              <Avatar rounded size={64} source={{uri:avatarURL}}/>
            </TouchableOpacity>
            <Text type="subheader" style={{color:"#393939",marginTop:25,marginRight:100,fontWeight:"650"}}>{name} {surname[0]}.</Text>{/*Adsoyad dosyasından Ad ve soyad çekilecek Arda K.*/}
          </View>
          {/*Profile*/}
        </View>
        {/*Navigation*/}
          <View style={{flex:1,flexDirection: 'row'}}>
          <View style={styles.subMenu}>
          <List.Section style={{marginBottom:-7}}>{/*Always on top of list*/}
          <List.Item left={props => <List.Icon {...props} icon={{uri:'https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Home-01-128.png'}} />} title="Anasayfa" onPress={() => {if(route.name != "anasayfa")navGoto("anasayfa")}}/>
          </List.Section>
            <ScrollView 
            showsHorizontalScrollIndicator={false}>{/*SUB MENU */}
            <List.Section>
              <List.Accordion
                title="Satış"
                left={props => <List.Icon {...props} icon={{uri :'https://cdn4.iconfinder.com/data/icons/unigrid-finance/61/014_cash_money_finance_currency-128.png'}} />}
                expanded={(expanded == 0) ? true : false}
                onPress={() => {handlePress(0)}}>
                <List.Item title="Ekle" onPress={() => {if(route.name != "satis-ekle")navGoto("satis-ekle")}}/>
                <List.Item title="Görüntüle" onPress={() => {if(route.name != "satis-goruntule")navGoto("satis-goruntule")}}/>
              </List.Accordion>
              <List.Accordion
                title="Kişiler"
                left={props => <List.Icon {...props} icon={{uri:'https://cdn0.iconfinder.com/data/icons/folders-40/24/folder_directory_user_personal-128.png'}} />}
                expanded={(expanded == 1) ? true : false}
                onPress={() => {handlePress(1)}}>
                <List.Item title="Ekle" onPress={() => {if(route.name != "kisi-ekle")navGoto("kisi-ekle")}}/>
                <List.Item title="Görüntüle" onPress={() => {if(route.name != "kisi-goruntule")navGoto("kisi-goruntule")}}/>
              </List.Accordion>
              <List.Accordion
                title="Ürün"
                left={props => <List.Icon {...props} icon={{uri:'https://cdn2.iconfinder.com/data/icons/thin-delivery/24/thin-1150_box_delivery_open-128.png'}} />}
                expanded={(expanded == 2) ? true : false}
                onPress={() => {handlePress(2)}}>
                <List.Item title="Ekle" onPress={() => {if(route.name != "urun-ekle")navGoto("urun-ekle")}}/>
                <List.Item title="Görüntüle" onPress={() => {if(route.name != "urun-goruntule")navGoto("urun-goruntule")}}/>
              </List.Accordion>
              <List.Accordion
                title="Kasa"
                left={props => <List.Icon {...props} icon={{uri:'https://cdn4.iconfinder.com/data/icons/logistics-and-shipping-5/85/crate_box_wooden_logistics_shipping-128.png'}} />}
                expanded={(expanded == 3) ? true : false}
                onPress={() => {handlePress(3)}}>
                <List.Item title="Ekle" onPress={() => {if(route.name != "kasa-ekle")navGoto("kasa-ekle")}}/>
                <List.Item title="Görüntüle" onPress={() => {if(route.name != "kasa-goruntule")navGoto("kasa-goruntule")}}/>
              </List.Accordion>
              <List.Accordion
                title="Boyut"
                left={props => <List.Icon {...props} icon={{uri:'https://cdn0.iconfinder.com/data/icons/logistic-51/64/size-package-box-delivery-128.png'}} />}
                expanded={(expanded == 4) ? true : false}
                onPress={() => {handlePress(4)}}>
                <List.Item title="Ekle" onPress={() => {if(route.name != "boyut-ekle")navGoto("boyut-ekle")}}/>
                <List.Item title="Görüntüle" onPress={() => {if(route.name != "boyut-goruntule")navGoto("boyut-goruntule")}}/>
              </List.Accordion>
              <List.Item left={props => <List.Icon {...props} icon={{uri:'https://cdn4.iconfinder.com/data/icons/business-and-economy-3/64/give_get_money_cash_coin_dollar-128.png'}} />} title="Ödenecekler" onPress={() => {if(route.name != "odeme")navGoto("odeme")}}/>
              <List.Item left={props => <List.Icon {...props} icon={{uri:'https://cdn1.iconfinder.com/data/icons/office-322/24/todo-document-doc-paper-list-checkmark-128.png'}} />} title="Yapılacaklar" onPress={() => {if(route.name != "yapilacaklar")navGoto("yapilacaklar")}}/>
              {(authority == "admin" || authority == "moderator") ? 
                <List.Accordion
                title="Admin"
                left={props => <List.Icon {...props} icon={{uri:'https://cdn1.iconfinder.com/data/icons/users-outline-1/40/17-128.png'}} />}
                expanded={(expanded == 5) ? true : false}
                onPress={() => {handlePress(5)}}>
                <List.Item title='Ekle' onPress={() => {if(route.name != "admin-ekle")navGoto("admin-ekle")}}/>
                <List.Item title="Görüntüle" onPress={() => {if(route.name != "admin-goruntule")navGoto("admin-goruntule")}}/>
              </List.Accordion>
                :
                null
              }
              {/* 
              <List.Item left={props => <List.Icon {...props} icon={{uri:'https://cdn1.iconfinder.com/data/icons/office-322/24/todo-document-doc-paper-list-checkmark-128.png'}} />} title="Yapılacaklar" onPress={() => {if(route.name != "yapilacaklar")navGoto("yapilacaklar")}}/>
              <List.Item left={props => <List.Icon {...props} icon={{uri:'https://cdn1.iconfinder.com/data/icons/office-322/24/todo-document-doc-paper-list-checkmark-128.png'}} />} title="Yapılacaklar" onPress={() => {if(route.name != "yapilacaklar")navGoto("yapilacaklar")}}/>
            */}
            </List.Section>
            </ScrollView>{/*SUB MENU */}
            </View>

            {children}
        </View>
        <FAB.Group
              style={styles.fab}
              icon={{uri:'https://cdn4.iconfinder.com/data/icons/navigation-40/24/add-128.png'}}
              open={open}
              actions={[
                {
                  icon: {uri:'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/headset-128.png'},
                  label: 'Destek',
                  onPress: () =>{
                    if(route.name != "destek")
                    console.log("destek")
                    },
                },
                {
                  icon: {uri:'https://cdn2.iconfinder.com/data/icons/picons-essentials/57/logout-128.png'},
                  label: 'Çıkış',
                  onPress: () => {
                    navGoto("login-1")
                    },
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
      </View>
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
    paddingLeft:35,//submenü ekle çıkar sağa kaydırma
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
  }, 
  
});