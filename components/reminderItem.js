import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';


export default function ReminderItem({ item, pressHandler }) {
    return(
        <TouchableOpacity onPress={() => pressHandler(item)}>
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
                <AntDesign style={styles.icon} name='caretright'/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        flexDirection: 'row',
        shadowOffset: { width: 1, height: 1},
        shadowOpacity: 0.7,
        shadowColor: '#333',
        shadowRadius: 3,
    }, 
    itemText: {
      color: '#888',
      fontSize: 18,
      marginHorizontal: 15,
    },
    icon: {
        paddingTop: 4,
        marginLeft: 'auto',
        fontSize: 16,
        color: '#888'
    }
})