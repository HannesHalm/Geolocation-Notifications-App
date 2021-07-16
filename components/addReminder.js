import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import MapView from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';


export default function AddReminder({ addReminder }) {
    const [location, setLocation] = React.useState({});
    React.useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          let region = {
            latitude: parseFloat(location.coords.latitude),
            longitude: parseFloat(location.coords.longitude),
            latitudeDelta: 5,
            longitudeDelta: 5
        };
        await this.setState({
            initialRegion: region
        });
           
          
        })();
      }, []);
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ name: '', info: '', coords: '' }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addReminder(values);
                    console.log(JSON.stringify(location.coords.longitude))
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
                        
                        <MapView style={globalStyles.map}
                            showsUserLocation={true}
                        />
                            
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