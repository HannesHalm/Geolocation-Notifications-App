import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header'
import ReminderItem from './components/reminderItem'
import AddReminder from './components/addReminder'

export default function App() {
  const [reminders, setReminder] = React.useState([
    { name : 'Mataffär', key: '1'},
    { name : 'Jobb', key: '2'},
    { name : 'Gym', key: '3'},
    { name : 'Hem', key: '4'},
  ])

  const pressHandler = (key) => {
    setReminder((prevReminder) => {
      return prevReminder.filter(reminder => reminder.key != key);
    })
  }

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
      <View style={styles.container}>
        {/**Header */}
        <Header />
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
  infoText: {
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
    paddingTop: 40,
    paddingHorizontal: 16
  },
  list: {
    //paddingHorizontal: 8,
    //marginHorizontal: 16,
    //marginTop: 24
  }
  
});
