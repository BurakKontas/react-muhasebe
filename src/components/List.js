import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from './Text';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "lightgray",
  },
  titleText: {
    fontWeight: 'bold',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});

export const ListItem = ({ title, subtitle, onPress = () => null }) => {
  const rowStyles = [styles.row];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={rowStyles}>
        <Text style={styles.titleText}>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ListSeparator = () => <View style={styles.separator} />;
