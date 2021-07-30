import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik, setFieldValue } from 'formik';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';


export default function AddReminder({ addReminder, location }) {
    const [marker, setMarker] = React.useState({latitude: 0,
                                                longitude: 0});
    
    const pressHandler = (event, props) => {
        props.setFieldValue("latitude", event.nativeEvent.coordinate.latitude);
        props.setFieldValue("longitude", event.nativeEvent.coordinate.longitude);
        setMarker(event.nativeEvent.coordinate);
        console.log("log", marker);
    }
    
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ name: '', info: '', latitude: 0, longitude:  0}}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addReminder(values);
                    console.log(JSON.stringify(location));
                    
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
                       
                        
                        <MapView style={globalStyles.map}
                            showsUserLocation={true}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onPress={ (event) => pressHandler(event, props) }
                            
                        >
                            <Marker 
                                coordinate={{ 
                                    latitude: marker.latitude,
                                    longitude: marker.longitude,
                                }} 
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