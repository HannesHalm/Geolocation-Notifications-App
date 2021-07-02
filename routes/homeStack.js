import {createAppContainer} from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import Home from '../screens/home';
import ReminderSetup from '../screens/reminderSetup';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Reminders',
        }
    },
    ReminderSetup: {
        screen: ReminderSetup,
        navigationOptions: {
            title: 'Edit Reminder',
        }
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: 'ivory', height: 70}
        }
    }
);

export default createAppContainer(HomeStack);