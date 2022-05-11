import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Alert, Picker} from 'react-native';


export const Pick = (props) => {
  const temp = props.array;
  const [selectedValue, setSelectedValue] = useState(props.array[0]);
  return(
  <Picker       
  selectedValue={selectedValue}
  style={props.style}
  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
  > //add your function to handle picker state change
  {temp.map((item, index) => {
  return (<Picker.Item label={item} value={index} key={index} />);
   })}  
 </Picker>
  )
}