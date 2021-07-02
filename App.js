import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from './styles/global';
import Home from './screens/home';
import { AppLoading } from 'expo';
import Navigator from './routes/homeStack';

export default function App() {
  return (
    <Navigator />
  );
}

