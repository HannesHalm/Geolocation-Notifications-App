import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';


export default function AddReminder({ addReminder }) {
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ name: '', info: '', coords: '' }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addReminder(values);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput 
                            style={globalStyles.input}
                            placeholder='Reminder Name'
                            onChangeText={props.handleChange('name')}
                            value={props.values.name}
                        />

                        <TextInput 
                            style={globalStyles.input}
                            multiline={true}
                            numberOfLines={4}
                            placeholder='Reminder Info'
                            onChangeText={props.handleChange('info')}
                            value={props.values.info}
                        />

                        <TextInput 
                            style={globalStyles.input}
                            placeholder='Reminder Location'
                            onChangeText={props.handleChange('coords')}
                            value={props.values.coords}
                        />

                        <Button title='Submit' color='brown' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>
    )
}
