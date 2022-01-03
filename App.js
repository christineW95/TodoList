

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import Home from './app/screens/Home';
import HomeStackNavigator from './app/navigation/stack';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={isDarkMode ? styles.container : {}}>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  }
});

export default App;
