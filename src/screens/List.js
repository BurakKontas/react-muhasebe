import React from 'react';
import { useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import { ListItem, ListSeparator } from '../components/List';
import { Text } from '../components/Text'
import { getUser } from '../helpers/getUser';
import { capitalize } from '../helpers/capitalize';
import { emailCleaner } from '../helpers/emailCleaner';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: 20,
    flex:1
  },  
  row: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  titleText: {
    fontWeight: 'bold',
  },
});

const defaultFlex = 0.049;//0.05 yapınca buglanıyor
const openedFlex = 0.25;//3 elements

var screens = [
  {
    title: 'Kayıt',
    subtitle: 'Kayıt Ekleme Silme Güncelleme ve Görüntüleme',
    submenus:[
      {
        title:"Ekle",
        subtitle:"Kayıt Ekler",
        target:"text-1",
      },
      {
        title:"Çıkar",
        subtitle:"Kayıt Çıkarır",
        target:"form-1",
      },
      {
        title:"Güncelle",
        subtitle:"Kayıt Günceller",
        target:"button-1",
      },
      {
        title:"Görüntüle",
        subtitle:"Kayıt Görüntüler",
        target:"main-1",
      },
    ],
  },
  {
    title: 'Ürün',
    subtitle: 'Ürün Ekleme Silme Güncelleme ve Görüntüleme',
    submenus:[
      {
        title:"Ekle",
        subtitle:"Ürün Ekler",
        target:"text-1",
      },
      {
        title:"Çıkar",
        subtitle:"Ürün Çıkarır",
        target:"form-1",
      },
      {
        title:"Güncelle",
        subtitle:"Ürün Günceller",
        target:"button-1",
      },
      {
        title:"Görüntüle",
        subtitle:"Ürün Görüntüler",
        target:"main-1",
      },
    ],
  },
  {
    title: 'Kişi',
    subtitle: 'Kişi Ekleme Silme Güncelleme ve Görüntüleme',
    submenus:[
      {
        title:"Ekle",
        subtitle:"Kişi Ekler",
        target:"text-1",
      },
      {
        title:"Çıkar",
        subtitle:"Kişi Çıkarır",
        target:"form-1",
      },
      {
        title:"Güncelle",
        subtitle:"Kişi Günceller",
        target:"button-1",
      },
      {
        title:"Görüntüle",
        subtitle:"Kişi Görüntüler",
        target:"main-1",
      },
    ],
  },
  {
    title:"Günlük",
    subtitle: 'Günlük Ekleme Silme Güncelleme ve Görüntüleme',
    submenus:[
      {
        title:"Ekle",
        subtitle:"Günlük Ekler",
        target:"text-1",
      },
      {
        title:"Çıkar",
        subtitle:"Günlük Çıkarır",
        target:"form-1",
      },
      {
        title:"Güncelle",
        subtitle:"Günlük Günceller",
        target:"button-1",
      },
      {
        title:"Görüntüle",
        subtitle:"Günlük Görüntüler",
        target:"main-1",
      },
    ],
  },
];

export const List = ({ navigation }) => {
setTimeout(() => {
navigation.setOptions({headerTitle:`${emailCleaner((getUser().email))}`,title:`${emailCleaner((getUser().email)).split("-")[0]}`})//timeout içine almayınca warning veriyor
})
const [screensFlex0 , setscreensFlex0] = useState(defaultFlex);
const [screensFlex1 , setscreensFlex1] = useState(defaultFlex);
const [screensFlex2 , setscreensFlex2] = useState(defaultFlex);
const [screensFlex3 , setscreensFlex3] = useState(defaultFlex);

const onPress0 = () => {
  if(screensFlex0 == defaultFlex) {
    setscreensFlex0(openedFlex)
    setscreensFlex1(defaultFlex)
    setscreensFlex2(defaultFlex)
    setscreensFlex3(defaultFlex)

  } else {
    setscreensFlex0(defaultFlex)
  }
}
const onPress1 = () => {
  if(screensFlex1 == defaultFlex) {
    setscreensFlex0(defaultFlex)
    setscreensFlex1(openedFlex)
    setscreensFlex2(defaultFlex)
    setscreensFlex3(defaultFlex)
  } else {
    setscreensFlex1(defaultFlex)
  }
}
const onPress2 = () => {
  if(screensFlex2 == defaultFlex) {
    setscreensFlex0(defaultFlex)
    setscreensFlex1(defaultFlex)
    setscreensFlex2(openedFlex)
    setscreensFlex3(defaultFlex)
  } else {
    setscreensFlex2(defaultFlex)
  }
}
const onPress3 = () => {
  if(screensFlex3 == defaultFlex) {
    setscreensFlex0(defaultFlex)
    setscreensFlex1(defaultFlex)
    setscreensFlex2(defaultFlex)
    setscreensFlex3(openedFlex)
  } else {
    setscreensFlex3(defaultFlex)
  }
}
  return (
    <View style={styles.container}>
      <ListSeparator />
      <View style={{flex:screensFlex0}}>
          <TouchableOpacity
            style={styles.row}
            onPress={onPress0}>
              <Text style={styles.titleText}>{screens[0].title}</Text>
              <Text>{screens[0].subtitle}</Text>
        </TouchableOpacity>
        <FlatList
        data={screens[0].submenus}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
        <ListItem
          title={item.title}
          subtitle={item.subtitle}
          onPress={() => { 
          navigation.push(item.target)
          setscreensFlex0(defaultFlex)
          }
          }
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
      </View>
      <ListSeparator />
      <View style={{flex:screensFlex1}}>
          <TouchableOpacity
            style={styles.row}
            onPress={onPress1}>
              <Text style={styles.titleText}>{screens[1].title}</Text>
              <Text>{screens[1].subtitle}</Text>
        </TouchableOpacity>
        <FlatList
        data={screens[1].submenus}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
        <ListItem
          title={item.title}
          subtitle={item.subtitle}
          onPress={() => { 
          navigation.push(item.target)
          setscreensFlex1(defaultFlex)
          }
          }
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
      </View>
      <ListSeparator />
      <View style={{flex:screensFlex2}}>
          <TouchableOpacity
            style={styles.row}
            onPress={onPress2}>
              <Text style={styles.titleText}>{screens[2].title}</Text>
              <Text>{screens[2].subtitle}</Text>
        </TouchableOpacity>
        <FlatList
        data={screens[2].submenus}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
        <ListItem
          title={item.title}
          subtitle={item.subtitle}
          onPress={() => { 
          navigation.push(item.target)
          setscreensFlex2(defaultFlex)
          }
          }
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
      </View>
      <ListSeparator />
      <View style={{flex:screensFlex3}}>
          <TouchableOpacity
            style={styles.row}
            onPress={onPress3}>
              <Text style={styles.titleText}>{screens[3].title}</Text>
              <Text>{screens[3].subtitle}</Text>
        </TouchableOpacity>
        <FlatList
        data={screens[3].submenus}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
        <ListItem
          title={item.title}
          subtitle={item.subtitle}
          onPress={() => { 
          navigation.push(item.target)
          setscreensFlex3(defaultFlex)
          }
          }
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
      </View>
    </View>
  );
};
