import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { globalStyles } from '../styles/global';

export default function ReminderSetup({ navigation }) {
    const [name, setName] = React.useState('');

    const changeHandler = (val) => {
        setName(val);
    }
    return(
        <View>
            <Text style={globalStyles.titleText}>Name</Text>
            <TextInput 
                style={globalStyles.input}
                value={ navigation.getParam('name') }
                //onChangeText={changeHandler}
            />
            <Text style={globalStyles.paragraph}>Info</Text>
            <TextInput 
                style={globalStyles.input}
                value={ navigation.getParam('info') }
                onChangeText={changeHandler}
            />
        </View>
    );
}