import firebase from 'firebase/compat/app'
import { ref, remove } from "firebase/database";
import { getUser } from '../helpers/getUser';
import { emailCleaner } from '../helpers/emailCleaner';
import { database } from '../../App';
import { FIREBASE_CONFIG } from '../../firebase.config'

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
}

function email(){
    return emailCleaner(getUser().email)
}

export const Cikar = (mod,path,id) => {
    var ifExists = Goruntule(mod,`${path}/${id}`)
    if(ifExists == null) {
        console.log("Böyle Bir Dosya Yok")
        return
    }
    remove(ref(database,`${email()}/${mod}/${path}/${id}`)).then(() => {
        console.log("Data Removed")
        return ifExists//pop metodu gibi birşey oldu
    }).catch((err) => {
        console.log(err.message)
    });
}
