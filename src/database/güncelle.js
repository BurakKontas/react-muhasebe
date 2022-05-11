import firebase from 'firebase/compat/app'
import { ref, update, set } from "firebase/database";
import { doc, setDoc } from 'firebase/firestore';
import { getUser } from '../helpers/getUser';
import { emailCleaner } from '../helpers/emailCleaner';
import { database, firestore } from '../../App';

import { FIREBASE_CONFIG } from '../../firebase.config'
import { Goruntule } from './görüntüle';

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
}

function email(){
    return emailCleaner(getUser().email)
}

export const Guncelle = (mod,path,id,data) => {
    var longPath=`${email()}/${mod}/${path}/${id}`
    var smallPath = `${path}/${id}`
    try{
        const reference = ref(database,longPath);//Test Edilmedi !!!
        var ifExists = Goruntule(mod,smallPath)
        if(ifExists == null) {
            console.log("Böyle bir dosya yok")
            return
        }
        update(reference,data)
        console.log("Data Updated")
    } catch(err) {
        console.log(err)
    }
}

/*realtime
    var longPath=`${email()}/${mod}/${path}/${id}`
    var smallPath = `${path}/${id}`
    try{
        const reference = ref(database,longPath);//Test Edilmedi !!!
        var ifExists = Goruntule(mod,smallPath)
        if(ifExists == null) {
            console.log("Böyle bir dosya yok")
            return
        }
        update(reference,data)
        console.log("Data Updated")
    } catch(err) {
        console.log(err)
    }
*/

/*  cloud
    var pathLong = `${email()}/${mod}/${path}/${id}` 
    var smallPath = `${path}/${id}`
    var ifExists = Goruntule(mod,smallPath)
    if(ifExists == null) {
        console.log("Böyle Bir Dosya Yok")
        return
    }    
    setDoc(doc(firestore,pathLong,id),data).then(() => {
        console.log("Data Updated")
    }).catch((err) => {
        console.log(err.message)
    });
*/
