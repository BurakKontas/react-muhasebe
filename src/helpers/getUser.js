import firebase from 'firebase/compat/app';
import 'firebase/auth'
import { FIREBASE_CONFIG } from '../../firebase.config'

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
}

export function getUser(){
    const user = firebase.auth().currentUser;
    return user;
}