import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import ReminderItem from '../components/reminderItem';
import AddReminder from '../components/addReminder';
import { globalStyles } from '../styles/global';


export default function Home({ navigation }) {
  const [reminders, setReminder] = React.useState([
    { name : 'Mataffär', key: '1', coords: '1.90', info: 'buy milk'},
    { name : 'Arbetsplats', key: '2', coords: '1.90', info: 'make coffee'},
    { name : 'Gym', key: '3', coords: '1.90' , info: 'train cardio'},
    { name : 'Hem', key: '4', coords: '1.90', info: 'Ställ ut soptunnor'},
  ])

  const pressHandler = (item) => {
    navigation.navigate('ReminderSetup', item);
    //navigation.push('ReminderSetup');
  }

  {/**
    Remove pressed item use later
const pressHandler = (key) => {
    setReminder((prevReminder) => {
      return prevReminder.filter(reminder => reminder.key != key);
    })
  } 
*/}

  const submitHandler = (name) => {
    if (name.length > 3) {
      setReminder((prevReminder) => {
        return [
          // change later to proper key generation
          { name: name, key: Math.random().toString() },
          ...prevReminder
        ];
      })
    }
    else {
      Alert.alert(
        "Name too short",
        "choose a longer name",
        [
          { text: "Understood", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
      <View style={globalStyles.container}>
        {/**Header */}
        {/*<Header />*/}
        <View style={styles.contents}>
          {/**Body */}
          <AddReminder submitHandler={submitHandler}/>
           
          <View style={styles.list}>
            <FlatList
              data ={reminders}
              renderItem={({ item }) => (
                <ReminderItem item={item} pressHandler={pressHandler}/>
              )} 
            />
          </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  }, 
  text: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  }, 
  item: {
    marginTop: 24,
    backgroundColor: 'lavenderblush',
    padding: 30,
    fontSize: 24,
  },
  contents: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16
  },
  list: {
    flex: 1,
    //paddingHorizontal: 8,
    //marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 20,
  }
  
});
