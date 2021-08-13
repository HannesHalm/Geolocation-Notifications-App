import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker, Circle } from 'react-native-maps';


export default function ReminderSetup({ route, navigation }) {
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
            <Text style={globalStyles.subtitle}>{"On entry"}</Text>
            <Text style={globalStyles.paragraph}>{ navigation.getParam('info') }</Text>
            
            <Text style={globalStyles.subtitle}>{"On exit"}</Text>
            <Text style={globalStyles.paragraph}>{ navigation.getParam('exitinfo') }</Text>
            <MapView style={globalStyles.map}
                showsUserLocation={true}
                region={{
                    latitude: navigation.getParam('latitude'),
                    longitude: navigation.getParam('longitude'),
                    // Multiplied with radius to zoom MapView accordingly
                    latitudeDelta: 0.0000922 * navigation.getParam('radius'),
                    longitudeDelta: 0.0000421 * navigation.getParam('radius'),
                }}
            >
                <Marker 
                    coordinate={{ 
                        latitude: navigation.getParam('latitude'),
                        longitude: navigation.getParam('longitude'),
                    }} 
                />
                <Circle 
                    center={{ 
                        latitude: navigation.getParam('latitude'),
                        longitude: navigation.getParam('longitude'),
                    }}
                    radius={ navigation.getParam('radius') }
                    strokeWidth = { 1 }
                    strokeColor = { '#1a66ff' }             
                    fillColor = { 'rgba(230,238,255,0.5)' }

                />
            </MapView>
            <AntDesign 
                name='delete'
                size={32}
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}