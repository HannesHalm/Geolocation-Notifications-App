import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const pressHandler = (key) => {
    console.log(key);
  }

export default function ReminderItem({ item, pressHandler }) {
    return(
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5
    }
})