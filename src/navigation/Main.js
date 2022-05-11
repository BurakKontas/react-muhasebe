import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Giris } from '../screens/logIn';
import { List } from '../screens/List';
import { TextDemo, ButtonDemo, FormDemo } from '../screens/Demos';
import { Anasayfa } from '../screens/anasayfa';
import { SatisEkle } from '../screens/muhasebe/SatisEkle';
import { SatisGoruntule } from '../screens/muhasebe/SatisGoruntule';
import { App } from '../screens/Main';
import { KasaEkle } from '../screens/muhasebe/KasaEkle';
import { KasaGoruntule } from '../screens/muhasebe/KasaGoruntule';
import { UrunEkle } from '../screens/muhasebe/UrunEkle';
import { UrunGoruntule } from '../screens/muhasebe/UrunGoruntule';
import { KisiEkle } from '../screens/muhasebe/KisilerEkle';
import { KisiGoruntule } from '../screens/muhasebe/KisilerGoruntule';
import { BoyutEkle } from '../screens/muhasebe/BoyutEkle';
import { BoyutGoruntule } from '../screens/muhasebe/BoyutGoruntule';
import { Odeme } from '../screens/muhasebe/Odeme';
import { Todo } from '../screens/yapilacaklar';
import { Destek } from '../screens/Destek';
import { Admin } from '../screens/Admin';
import { AdminGoruntule } from '../screens/AdminGoruntule';

const MainStack = createStackNavigator();

export const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="login-1"
      component={Giris}
      options={{
      title:"Giriş",
      headerShown:false
      }}
    />
    <MainStack.Screen
      name="main-1"
      component={App}
      options={{
      headerShown:false
      }}
    />
    <MainStack.Screen
      name="satis-ekle"
      component={SatisEkle}
      options={{
      title:"Satış Ekle",
      headerShown:false
      }}
    />
    <MainStack.Screen
      name="satis-goruntule"
      component={SatisGoruntule}
      options={{
      title:"Satış Görüntüle",
      headerShown:false
      }}
    />
    <MainStack.Screen 
    name="menu-1"
    component={List}
    options={{
      title:"Menü",
      headerShown:false
      }} 
    />
    <MainStack.Screen
      name="text-1"
      component={TextDemo}
      options={{ 
        title:"Text Demo",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="form-1"
      component={FormDemo}
      options={{ 
        title:"FormDemo",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="button-1"
      component={ButtonDemo}
      options={{ 
        title:"ButtonDemo",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="anasayfa"
      component={Anasayfa}
      options={{
        title:"Anasayfa",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="kasa-ekle"
      component={KasaEkle}
        options={{
          title:"Kasa Ekle",
          headerShown:false
      }}
    />
    <MainStack.Screen
      name="kasa-goruntule"
      component={KasaGoruntule}
      options={{
        title:"Kasa Görüntüle",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="urun-ekle"
      component={UrunEkle}
      options={{
        title:"Ürün Ekle",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="urun-goruntule"
      component={UrunGoruntule}
      options={{
        title:"Ürün Görüntüle",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="kisi-ekle"
      component={KisiEkle}
      options={{
        title:"Kişi Ekle",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="kisi-goruntule"
      component={KisiGoruntule}
      options={{
        title:"Kişi Görüntüle",
        headerShown:false
      }}
    />      
    <MainStack.Screen
      name="boyut-ekle"
      component={BoyutEkle}
      options={{
        title:"Boyut Ekle",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="boyut-goruntule"
      component={BoyutGoruntule}
      options={{
        title:"Boyut Görüntüle",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="odeme"
      component={Odeme}
      options={{
        title:"Ödeme",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="yapilacaklar"
      component={Todo}
      options={{
        title:"Yapılacaklar",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="destek"
      component={Destek}
      options={{
        title:"Destek",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="admin-ekle"
      component={Admin}
      options={{
        title:"Administration",
        headerShown:false
      }}
    />
    <MainStack.Screen
      name="admin-goruntule"
      component={AdminGoruntule}
      options={{
        title:"Administration",
        headerShown:false
      }}
    />
    </MainStack.Navigator>
);
/* header options

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#00cc00"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} */