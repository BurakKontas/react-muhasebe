import 'react-native-gesture-handler';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore'

import { FIREBASE_CONFIG } from './firebase.config'

var app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(FIREBASE_CONFIG)
}
export const database = getDatabase(app);
export const firestore = getFirestore(app);

import App from './src';

export default App;
