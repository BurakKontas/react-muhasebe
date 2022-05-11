import React from 'react';
import { StyleSheet, View} from 'react-native';

import colors from '../constants/colors';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';
import { useLogin } from '../util/auth';
import { Pick } from "../components/Picker";
import { Ekle } from '../database/ekle';
import { getDate } from '../helpers/getDate';
import { emailCleaner } from '../helpers/emailCleaner';
import { getUser } from '../helpers/getUser';
import { Goruntule } from '../database/görüntüle';
import { Guncelle } from '../database/güncelle';
import { CircleButton } from '../components/CircleButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});
var options =["Home","Savings","Car","GirlFriend"];
export const TextDemo = () => (
  <View style={styles.container}>
    <Pick array={options} style={{ height: 50, width: 150 }}/>
    <Text type="header">This is a header</Text>
    <Text type="subheader">This is a subheader</Text>
    <Text>This is normal text</Text>
  </View>
);

export const FormDemo = () => {
  const { submit, errors, email, setEmail, password, setPassword } = useLogin();
  return (
    <View style={styles.container}>    
      <TextInput
        label="Email Address"
        placeholder="Enter your email..."
        value={email}
        onChangeText={text => setEmail(text)}
        errorText={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="Enter your password..."
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        errorText={errors.password}
        autoCapitalize="none"
      />
      <Button onPress={submit}>Sign In</Button>
    </View>
  );
};
function f(){
  Ekle("kayit","kisiler","deneme",{
    id:20,
    date:getDate(),
    data:30,
  })
var list = Goruntule("kayit","kisiler","deneme")
console.log(list)
}
function f2(){
Guncelle("kayit","kisiler","deneme",{
    data:10,
    id:"orospu cevdet",
    date:"31.01.2031"
  })
  var list = Goruntule("kayit","kisiler","deneme")
  console.log(list)
}
export const ButtonDemo = () => (
  <View style={styles.container}>
    <Button onPress={f}>
    Default Button
    </Button>
    <Button
      type="outline"
      onPress={f2}
    >
      Outline Button
    </Button>
  </View>
);
