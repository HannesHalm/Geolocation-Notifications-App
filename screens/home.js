import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, AppState, 
  TouchableWithoutFeedback, Keyboard, Modal, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/header';
import ReminderItem from '../components/reminderItem';
import AddReminder from '../components/addReminder';
import { globalStyles } from '../styles/global';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


const LOCATION_TASK_NAME = "background-location-task";
const GEOFENCING_TASK_NAME = "background-geofencing-task";

export default function Home({ navigation }) {
  const [location, setLocation] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  //const [reminders, setReminder] = React.useState([]);
  const [reminders, setReminder] = React.useState([
    { name : 'Mataffär', key: '1', latitude: 59.67493823789304, longitude: 16.589259244501587, radius: 20, info: 'buy milk', exitinfo: ''},
    { name : 'Arbetsplats', key: '2', latitude: 59.67404018129062, longitude: 16.589239463210102, radius: 20, info: 'make coffee', exitinfo: ''},
    { name : 'Gym', key: '3', latitude: 59.67, longitude: 16.587, radius: 50, info: 'train cardio', exitinfo: ''},
    { name : 'Hem', identifier: '4', key: '4', latitude: 59.67511615350818, longitude: 16.588357016444206, radius: 10, info: 'Ställ ut soptunnor', exitinfo: 'Dra ut strykjärnet'},
  ]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [expoPushToken, setExpoPushToken] = React.useState(null);

  // Fetch location updates
  const startWatchingPosition = async () => {
    //Background location 
    try {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        enableHighAccuracy: true,
        accuracy: Location.LocationAccuracy.Highest,
        distanceInterval: 0,
        timeInterval: 1500,
        foregroundService: {
          notificationTitle: "Kamrat",
          notificationBody: "Tracking location for reminders"
        }
      }); } catch(e) {
        console.log(e);
      }

    //Foreground location updates state for MapView in add reminder
    let location = await Location.watchPositionAsync(
      {
        accuracy: Location.LocationAccuracy.Highest,
        timeInterval: 1500,
        distanceInterval: 0,
      }, 
      locationUpdate => {
        setLocation(locationUpdate);
      });
  }

  // Start or update geofence with current reminders
  

  /*
  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;

    setExpoPushToken(token);
    
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };
  */

  // Calls location and geofence on start up
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let { statusBackground } = await Location.requestBackgroundPermissionsAsync();

      if (status !== 'granted' && statusBackground !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      else {
        console.log("App started with permissions");
        startWatchingPosition();
        initalizeGeofence();
        
        //registerForPushNotificationsAsync();
      }
    })();
  }, []);
  
  React.useEffect(() => {
    initalizeGeofence();
  }, [reminders]);

  const initalizeGeofence = async () => {
    try {
      await Location.startGeofencingAsync(GEOFENCING_TASK_NAME, 
          reminders
      );
    } catch(e) {
      console.log(e);
    }
  }

  TaskManager.defineTask(GEOFENCING_TASK_NAME, ({ data: { eventType, region }, error }) => {
    if (error) {
      // check `error.message` for more details.
      console.log(error.message);
      return;
    }
    // Find reminder object to access additional information
    let reminderTriggered = reminders.find(o => o.latitude === region.latitude && o.longitude === region.longitude);

    if (eventType === Location.LocationGeofencingEventType.Enter) {
      // Replace with Push-Notification in future
      console.log("You've entered:", reminderTriggered.name, region);
      if (reminderTriggered.info !== '') {
        Alert.alert(
          "Entered " + reminderTriggered.name,
          reminderTriggered.info,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    } 
    else if (eventType === Location.LocationGeofencingEventType.Exit) {
      console.log("You've left:", reminderTriggered.name, region);
      if (reminderTriggered.exitinfo !== '') {
        Alert.alert(
          "Exited " + reminderTriggered.name,
          reminderTriggered.exitinfo,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    }
  });
  
  // Background task to poll location
  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      console.log(AppState.currentState);
    }
  });
    
  // For debugging purposes (shows coordinates in app)
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const addReminder = (reminder) => {
    let keyId = Math.random().toString();
    reminder.key = keyId;
    reminder.radius = parseInt(reminder.radius);
    setReminder((currentReminders) => {
        return [reminder, ...currentReminders];
    });

    // Start geofence with new reminder

    setModalOpen(false);
  
  }

  // Navigate to individual reminder screen
  const pressHandler = (item) => {
    navigation.navigate('ReminderSetup', item);
  }

  // Remove item from reminders with given key
  const removeHandler = (key) => {
    setReminder((prevReminder) => {
      return prevReminder.filter(reminder => reminder.key != key);
    });
  } 

  const isNull = (object) => {
    return object === null;
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

     
            <AntDesign name='pluscircle'
                style={globalStyles.modalToggle}
                name='pluscircle'
                size={32}
                onPress={() => isNull(location) ? alert("Wait for location data to be gathered") : setModalOpen(true)}
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
