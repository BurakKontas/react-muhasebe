import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { StackActions } from '@react-navigation/native';
import colors from '../constants/colors';
import { Text } from '../components/Text'
import { Button } from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { loginUser } from '../api/auth-api'

export const Giris =  ({ navigation }) => {
    const [email, setEmail] = useState({ value: ''})
    const [password, setPassword] = useState({ value: ''})
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    const onLoginPressed = async () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
          setEmailError("  "+emailError)
          setPasswordError("  "+passwordError)
          setTimeout(() => {
            setEmailError('')
            setPasswordError('')
          },2000)
          return
        }
        setLoading(true)
        const response = await loginUser({
          email: email.value,
          password: password.value,
        })
        if (response.error) {
          if(response.error == "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).") {
              response.error = "Böyle Bir Kullanıcı Bulunamadı."
          } else if(response.error == "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."){
            response.error = "Şifre Yanlış."
          }
          setError("  "+response.error)
          setTimeout(() => {
            setError('')
          },5000)
        } else {
            navigation.dispatch(StackActions.replace("anasayfa"))
        }
        setLoading(false)
      }
    return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:colors.background}}>
        <View style={styles.container}>
        <TextInput
        style={styles.input}
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text})}
        error={!!email.error}
        errorText={email.error}
        placeholder="E-Mail"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onLoginPressed() }}//enter e basılırsa yine buttona basılmış gibi saysın
        keyboardType="email-address"
      />
      <Text style={{color:colors.error}}>{emailError}</Text>
      <TextInput
        style={styles.input}
        label="Password"
        returnKeyType="done"
        placeholder="Şifre"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text})}
        onKeyPress={(e) => {if(e.nativeEvent.key == "Enter") onLoginPressed() }}//enter e basılırsa yine buttona basılmış gibi saysın
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        />
        <Text style={{color:colors.error}}>{passwordError}</Text>
        <Text style={{color:colors.error}}>{error}</Text>
        <Button 
        style={styles.input}
        type="outline"
        loading={loading}
        onPress={onLoginPressed}>
        Giriş Yap
      </Button>
        </View>
    </View>
)}

const styles = StyleSheet.create({
    input:{
        padding:10,
        width:"50em",
        borderWidth:3,
        borderRadius:15,
        borderColor:colors.border,
    },
    container:{
        flex:0.3,
        marginTop:30,
        marginRight:30,
        backgroundColor:colors.background,
    }
});


