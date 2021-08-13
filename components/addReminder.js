import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik, setFieldValue } from 'formik';
import MapView, { Marker, Circle } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';


export default function AddReminder({ addReminder, location }) {
    const [marker, setMarker] = React.useState({latitude: 0,
                                                longitude: 0});
    
    const pressHandler = (event, props) => {
        props.setFieldValue("latitude", event.nativeEvent.coordinate.latitude);
        props.setFieldValue("longitude", event.nativeEvent.coordinate.longitude);
        
        // Weird error console.log(marker) is one press behind
        setMarker(event.nativeEvent.coordinate);
    }
    
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ name: '', info: '', exitinfo: '', latitude: 0, longitude:  0, radius: '10'}}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addReminder(values);
                    console.log("Ny reminder", values.name);
                    
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
                            numberOfLines={3}
                            placeholder='Reminder On Entry'
                            onChangeText={props.handleChange('info')}
                            value={props.values.info}
                        />

                        <TextInput 
                            style={globalStyles.input}
                            multiline={true}
                            numberOfLines={3}
                            placeholder='Reminder On Exit'
                            onChangeText={props.handleChange('exitinfo')}
                            value={props.values.exitinfo}
                        />

                        <TextInput 
                            style={globalStyles.input}
                            placeholder='Reminder Radius'
                            keyboardType='numeric'
                            onChangeText={props.handleChange('radius')}
                            value={props.values.radius}
                        />
                       
                        <MapView style={globalStyles.map}
                            showsUserLocation={true}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.000922,
                                longitudeDelta: 0.000421,
                            }}
                            onPress={ (event) => pressHandler(event, props) }
                        >
                            <Marker 
                                coordinate={{ 
                                    latitude: marker.latitude,
                                    longitude: marker.longitude,
                                }} 
                            />
                            <Circle 
                                center={{ 
                                    latitude: marker.latitude,
                                    longitude: marker.longitude,
                                }}
                                // If field empty set radius to 0
                                radius={isNaN(parseInt(props.values.radius)) ? 6 : parseInt(props.values.radius)}
                                strokeWidth = { 1 }
                                strokeColor = { '#1a66ff' }             
                                fillColor = { 'rgba(230,238,255,0.5)' }

                            />
                        </MapView>
                            
                        <Button title='Submit' color='brown' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>
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
    mapSelect: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})