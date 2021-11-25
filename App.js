import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppRegistry } from 'react-native'
import Routes from '../my-project/Routes';
export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
AppRegistry.registerComponent("main", () => App());