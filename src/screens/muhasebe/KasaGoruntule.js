import React,{ useState, useEffect } from 'react';
import { App } from '../Main';
import { StyleSheet, View, ScrollView, Button, TextInput } from "react-native";
import DataTable from 'react-data-table-component';
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
import firebase from 'firebase/compat/app'
import { firestore } from '../../../App';
import { FIREBASE_CONFIG } from '../../../firebase.config';
import { getUser } from '../../helpers/getUser';
import { emailCleaner } from '../../helpers/emailCleaner';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

import colors from '../../constants/colors';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

export function email(){
  return emailCleaner(getUser().email)
}

const columns = [
  {
      name: 'İsim',
      selector: row => row.isim,
      sortable: true,
  },
  {
      name: 'Dara',
      selector: row => row.dara,
      sortable: true,
      conditionalCellStyles: [{when:row => row.dara, style:{backgroundColor:"lightgrey"}}]
      
  },
];


export const KasaGoruntule = ({navigation}) => {
var tempData = []
const [data,setData] = useState()
const [selecteds, setSelecteds] = useState()
const [filteredData,setFilteredData] = useState()
const [pending, setPending] = React.useState(true);
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const update = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const collectionRef = collection(firestore,`data/${email()}/kasa`);
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
update();
const handleChange = ({ selectedRows }) => {
   // You can set state or dispatch with something like Redux so we can use the retrieved data
  setSelecteds(selectedRows)
};
const deleteSelecteds = () => {
  selecteds.map((item) => {
    const ref = doc(firestore, `data/${email()}/kasa`, item.isim);
    deleteDoc(ref)
  })
  const collectionRef = collection(firestore,`data/${email()}/kasa`);
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
		item => item.isim && item.isim.toLowerCase().includes(text.toLowerCase()),
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
        />
        <View style={styles.button}>
          <Button disabled={pending} title={"Seçilileri Sil"} onPress={deleteSelecteds}></Button>
        </View>
        </ScrollView>
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
    flex: 1,
    padding: 15,
    flexDirection:"column",
    margin:30,
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
