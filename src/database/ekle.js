import firebase from 'firebase/compat/app'
import { ref, push, set } from "firebase/database";
import { getUser } from '../helpers/getUser';
import { emailCleaner } from '../helpers/emailCleaner';
import { database, firestore } from '../../App'
import { doc , setDoc} from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../../firebase.config'

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
}

function email(){
    return emailCleaner(getUser().email)
}

export const Ekle = (mod,path,id,data) => {
    var pathLong = `${email()}/${mod}/${path}` 
    const reference = ref(database,`${pathLong}/${id}`);
    push(reference)
    set(reference,data).then(() => {
            console.log("Data Added")
        }).catch((err) => {
            console.log(err.message)
        });
}

/*
 Ekle("kayit","kisiler","deneme",{
    id:20,
    date:getDate(),
    data:30,
    })//herhangi bir veri değişirse veriyi güncelliyor
    //her iki databasede de aynı işlem
*/

/*RealTime Database //
const reference = ref(database,`${email()}/${mod}/${path}`);
push(reference)
set(reference,data).then(() => {
        console.log("Data Added")
    }).catch((err) => {
        console.log(err.message)
    });
*/

/*  cloud database
    var pathLong = `${email()}/${mod}/${path}` 
    setDoc(doc(firestore,pathLong,id),data).then(() => {
        console.log("Data Added")
    }).catch((err) => {
        console.log(err.message)
    });
*/