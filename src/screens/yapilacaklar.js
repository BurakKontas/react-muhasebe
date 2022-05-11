import React,{ useState, useEffect } from 'react';
import { App } from './Main';
import { StyleSheet, View, ScrollView, Button, TextInput, Text } from "react-native";
import DataTable from 'react-data-table-component';
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
import firebase from 'firebase/compat/app'
import { firestore } from '../../App';
import { FIREBASE_CONFIG } from '../../firebase.config';
import { getUser } from '../helpers/getUser';
import { emailCleaner } from '../helpers/emailCleaner';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';


import colors from '../constants/colors';
import { getDate } from '../helpers/getDate';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

export function email(){
  return emailCleaner(getUser().email)
}

const columns = [
  {
      name: 'İş',
      selector: row => row.todo,
      sortable: true,
  },
  {
    name: 'Tarih',
    selector: row => row.tarih,
    sortable: true,
  },
  {
    name: 'Öncelik',
    selector: row => row.prio,
    sortable: true,
  },  
];

const conditionalRowStyles = [
    {
      when: row => row.prio == 3,
      style: {
        backgroundColor: '#FB6363',
      },
    },
    {
        when: row => row.prio == 2,
        style: {
          backgroundColor: '#F7FB63',
        },
    },
    {
        when: row => row.prio == 1,
        style: {
          backgroundColor: '#77FB63',
        },
    },
    // You can also pass a callback to style for additional customization
];

export const Todo = ({navigation}) => {
var tempData = []
const [data,setData] = useState()
const [selecteds, setSelecteds] = useState()
const [filteredData,setFilteredData] = useState()
const [pending, setPending] = useState(true);
const [todo,setTodo] = useState();
const [date, setDate] = useState();
const [prio, setPrio] = useState();
const [hata, setHata] = useState(false)
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const Err = () => {
    setHata(1)
    setTimeout(() => {
        setHata(0)
    },2000)
    return
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const update = () => {
    useEffect(() => {
      const timeout = setTimeout(() => {
        const collectionRef = collection(firestore,`data/${email()}/todo`);
        getDocs(collectionRef).then((response) => {
          response.docs.map((item) => {
            tempData.push(item.data())
          })
          setData(tempData)
          setFilteredData(tempData)
      })
      setPending(false);
      },2000)
      return () => clearTimeout(timeout);
    }, []);
}

const todoEkle = () => {
  var sayi = randomInt(0,10000)
    if((prio == 1 || prio == 2 || prio == 3) && date.split(".").length == 3) {
        console.log("OK")
        const output = {
            id:sayi,
            todo:todo,
            tarih:date,
            prio:prio,
        }
        var pathLong = `data/${email()}/todo` 
        setDoc(doc(firestore,pathLong,`${sayi}`),output).then(() => {
        }).catch((err) => {
          console.log(err.message)
      });
      const collectionRef = collection(firestore,`data/${email()}/todo`);
      getDocs(collectionRef).then((response) => {
        response.docs.map((item) => {
          tempData.push(item.data())
        })
        setData(tempData)
        setFilteredData(tempData)
        })
    } else {
        Err()
    }
}

update();
const handleChange = ({ selectedRows }) => {
   // You can set state or dispatch with something like Redux so we can use the retrieved data
  setSelecteds(selectedRows)
};
const deleteSelecteds = () => {
  selecteds.map((item) => {
    const ref = doc(firestore, `data/${email()}/todo`, item.id);
    deleteDoc(ref)
  })
  const collectionRef = collection(firestore,`data/${email()}/todo`);
  getDocs(collectionRef).then((response) => {
    response.docs.map((item) => {
      tempData.push(item.data())
    })
    setData(tempData)
    setFilteredData(tempData)
  });
};
const filtered = (text) => {
  setFilteredData(data.filter(
		item => item.todo && item.todo.toLowerCase().includes(text.toLowerCase()),
	))
 }
 const paginationComponentOptions = {
  rowsPerPageText: 'Görüntülenen Satır',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Tümü',
};
  return (
    <App navigation={navigation}>
      <View style={styles.containerStyle}>
        <ScrollView 
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewStyle}>
        <TextInput
          disabled={pending}
          onChangeText={(term) => {filtered(term)}} 
          style={styles.textInput}
          placeholder="Filtrele"
        />
        <DataTable
            selectableRows
            columns={columns}
            data={filteredData}
            pagination
            selectableRowsComponentProps={selectProps}
            onSelectedRowsChange={handleChange}
            dense
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            paginationComponentOptions={paginationComponentOptions}            
            progressPending={pending}
            highlightOnHover={true}
            conditionalRowStyles={conditionalRowStyles}
        />
        <View style={styles.button}>
        <Button disabled={pending} title={"Seçilileri Sil"} onPress={deleteSelecteds}></Button>
        </View>
        </ScrollView>
        <View style={{flex:0.40,backgroundColor:"grey",marginBottom:30,marginHorizontal:30,flexDirection:'row'}}>
        <TextInput
          disabled={pending}
          onChangeText={(term) => {setTodo(term)}} 
          style={[styles.textInput,{height:30,marginTop:100,marginLeft:100,marginRight:50,width:"30%"}]}
          placeholder="Yapılacak Ekle"
        />
        <TextInput
          disabled={pending}
          onChangeText={(term) => {setPrio(term)}} 
          style={[styles.textInput,{height:30,marginTop:100,width:"10%"}]}
          placeholder="Öncelik Ekle (1-3)"
        />
        <TextInput
          disabled={pending}
          onChangeText={(term) => {setDate(term)}} 
          style={[styles.textInput,{height:30,marginTop:100,marginLeft:50,width:"20%"}]}
          placeholder="Son Tarih Ekle (30.04.2022)"
        />
        <View style={{height:30,marginTop:100,marginLeft:50}}>
        <Button title={"Ekle"} onPress={todoEkle}/>
        </View>
        <Text style={{color:colors.error,opacity:(hata) ? 1 : 0,marginTop:100,marginLeft:50}}>HATA</Text>
        </View>
      </View>
    </App>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 10,
    color:"black"
  },
  scrollViewStyle: {
    flex: 0.60,
    padding: 15,
    flexDirection:"column",
    margin:30,
    marginBottom:0,
    backgroundColor:"lightgray"
  },
  textInput:{
    padding:10,    
    borderWidth:3,
    borderRadius:5,
    borderColor:colors.border,
    backgroundColor:colors.white,
    marginBottom:10,
    width:"90%"
  },
  button:{
    position:'absolute',
    marginTop:5,
    right:1,
    marginRight:25
  },
});
