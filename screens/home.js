import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableWithoutFeedback, Keyboard, Modal, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import ReminderItem from '../components/reminderItem';
import AddReminder from '../components/addReminder';
import { globalStyles } from '../styles/global';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = "background-location-task";
const GEOFENCING_TASK_NAME = "background-geofencing-task";

export default function Home({ navigation }) {
  const [location, setLocation] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [reminders, setReminder] = React.useState([
    { name : 'Mataffär', key: '1', latitude: 0, longitude: 1, info: 'buy milk'},
    { name : 'Arbetsplats', key: '2', latitude: 0, longitude: 1, info: 'make coffee'},
    { name : 'Gym', key: '3', latitude: 0, longitude: 1, info: 'train cardio'},
    { name : 'Hem', key: '4', latitude: 0, longitude: 1, info: 'Ställ ut soptunnor'},
  ])
  const [errorMsg, setErrorMsg] = React.useState(null);

  const startWatchingPosition = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      enableHighAccuracy: true,
      distanceInterval: 2,
      timeInterval: 5000
    });

    let location = await Location.watchPositionAsync(
      {
        accuracy: 5,
        timeInterval: 5000,
        banan: 10,
        distanceInterval: 1,
      }, 
      locationUpdate => {
        setLocation(locationUpdate);
      });
  }

 

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      else {
        startWatchingPosition();
        Location.startGeofencingAsync(GEOFENCING_TASK_NAME, [
          {
            latitude: 59.67509042266887, 
            longitude: 16.588414348661903, 
            radius: 2
          }
        ]);
      }
    })();
  }, []);

  TaskManager.defineTask(GEOFENCING_TASK_NAME, ({ data: { eventType, region }, error }) => {
    console.log("hej Från GEOFENCE");
    if (error) {
      // check `error.message` for more details.

      return;
    }
    if (eventType === Location.LocationGeofencingEventType.Enter) {
      console.log("You've entered region:", region);
      alert("success entry");
    } else if (eventType === Location.LocationGeofencingEventType.Exit) {
      console.log("You've left region:", region);
      alert("success exit");
    }
  });
     
  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      console.log(data);

    }
  });
    


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const addReminder = (reminder) => {
    reminder.key = Math.random().toString();
    console.log(reminder.name);
    console.log(reminder.latitude);
    console.log(reminder.longitude);
    setReminder((currentReminders) => {
        return [reminder, ...currentReminders];
    });

    setModalOpen(false);
  }


  const pressHandler = (item) => {
    const region = reminders.map(a => a.latitude);
    
    navigation.navigate('ReminderSetup', item);
  }

  const removeHandler = (key) => {
      setReminder((prevReminder) => {
      return prevReminder.filter(reminder => reminder.key != key);
      })
  } 


  return (
    <View style={globalStyles.container}>
        {/*<Header />*/}
        <View style={styles.contents}>
          {/**Body */}
            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <AntDesign 
                            style={globalStyles.modalToggle}
                            name='closecircle'
                            size={32}
                            onPress={() => setModalOpen(false)}
                        />
                        <AddReminder addReminder={addReminder} location={location}/>
                    </View>
                </TouchableWithoutFeedback>
                
            </Modal>
           
            
            {/** 
            <AddReminder submitHandler={submitHandler}/>
            */}

            <View style={styles.list}>
                <FlatList
                data ={reminders}
                renderItem={({ item }) => (
                    <ReminderItem item={item} pressHandler={pressHandler}/>
                )} 
                />
            </View>
            
            <View style={globalStyles.container}>
             <Text style={globalStyles.paragraph}>{text}</Text>
            </View>

            <AntDesign name='pluscircle'
                style={globalStyles.modalToggle}
                name='pluscircle'
                size={32}
                onPress={() => setModalOpen(true)}
            />
        </View>
    </View>
    
    );
}

const styles = StyleSheet.create({
  text: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  }, 
  contents: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16
  },
  modalContent: {
    flex: 1,
  },
  list: {
    flex: 1,
    //paddingHorizontal: 8,
    //marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 20,
  }
  
});
