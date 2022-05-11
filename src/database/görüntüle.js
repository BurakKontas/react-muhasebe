import firebase from 'firebase/compat/app'
import { ref, onValue} from "firebase/database";
import { getUser } from '../helpers/getUser';
import { emailCleaner } from '../helpers/emailCleaner';
import { database, firestore } from '../../App';
import { FIREBASE_CONFIG } from '../../firebase.config'
import { collection, getDocs } from 'firebase/firestore';

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
}

export function email(){
    return emailCleaner(getUser().email)
}

export const Goruntule = (mod,path,id) => {
    const reference = ref(database,`${email()}/${mod}/${path}/${id}`)
    var data = [];
    onValue(reference, snapShot => {
        if(snapShot.exists()) {
        data.push(snapShot.val())
        } else {
            return null;
        }
    });
    return (data)
}
/*  cloud
    var list = []
    const collectionRef = collection(firestore,`${email()}/${mod}/${path}`);
    getDocs(collectionRef).then((response) => {
        response.docs.map((item) => {
            list.push(item.data())
        })
    })
    return list
*/
/*  realtime
    const reference = ref(database,`${email()}/${mod}/${path}`)
    var data = [];
    onValue(reference, snapShot => {
        if(snapShot.exists()) {
        data.push(snapShot.val())
        } else {
            return null;
        }
    });
    return (data)
*/