import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '@/components/Main';

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
        <Main />
  );
}
