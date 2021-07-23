import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { AntDesign } from '@expo/vector-icons';


export default function ReminderSetup({ navigation }) {
    const [name, setName] = React.useState('');

    {/** 
    const pressHandler = (key) => {
        setReminder((prevReminder) => {
          return prevReminder.filter(reminder => reminder.key != key);
        })
    } 
    */}
    return(
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>{ navigation.getParam('name') }</Text>
            <Text style={globalStyles.paragraph}>{ navigation.getParam('info') }</Text>
            <Text style={globalStyles.paragraph}>{ navigation.getParam('latitude')}</Text>
            <Text style={globalStyles.paragraph}>{ navigation.getParam('longitude')}</Text>
            <AntDesign 
                name='delete'
                size={32}
                onPress={() => alert('Remove item')}
            />
        </View>
    );
}