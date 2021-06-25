import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function AddReminder({ submitHandler }) {
    const [name, setName] = React.useState('');

    const changeHandler = (val) => {
        setName(val);
    }

    return (
        <View>
            <TextInput 
                style={styles.input}
                placeholder='new reminder'
                onChangeText={changeHandler}
            />
            <Button onPress={() => submitHandler(name)} title='add reminder' color='brown' />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
})