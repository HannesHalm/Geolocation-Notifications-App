import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard, Modal, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import ReminderItem from '../components/reminderItem';
import AddReminder from '../components/addReminder';
import { globalStyles } from '../styles/global';
import { AntDesign } from '@expo/vector-icons';


export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [reminders, setReminder] = React.useState([
    { name : 'Mataffär', key: '1', coords: '1.90', info: 'buy milk'},
    { name : 'Arbetsplats', key: '2', coords: '1.90', info: 'make coffee'},
    { name : 'Gym', key: '3', coords: '1.90' , info: 'train cardio'},
    { name : 'Hem', key: '4', coords: '1.90', info: 'Ställ ut soptunnor'},
  ])

  const addReminder = (reminder) => {
    reminder.key = Math.random().toString();
    setReminder((currentReminders) => {
        return [reminder, ...currentReminders];
    });
    setModalOpen(false);
  }

  const pressHandler = (item) => {
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
                        <AddReminder addReminder={addReminder} />
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