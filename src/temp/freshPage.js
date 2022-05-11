import React from 'react';
import { useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';

import colors from '../constants/colors';
import { ListItem, ListSeparator } from '../components/List';
import { Text } from '../components/Text'

export const logIn = () => {
    return (
        <View style={styles.container}>
            <Text type="header">Hello World</Text>
        </View>
)}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
    }
});


