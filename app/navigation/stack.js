/* eslint-disable prettier/prettier */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import { SafeAreaView } from 'react-native';
import LoginScreen from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#054F72',
            }}>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#1E1A3C',
                    },
                    headerTitleStyle: {
                        color: 'white',
                    },

                }}>
                <Stack.Screen name="Sign up" component={Register} options={{
                    headerBackTitleStyle: {
                        color: 'white'
                    }
                }} />

                <Stack.Screen name="Login" component={LoginScreen} options={{
                    headerBackTitleStyle: {
                        color: 'white'
                    }
                }} />

                <Stack.Screen name="Home" component={Home} options={{
                    headerBackVisible: false,
                    headerBackTitleStyle: {
                        color: 'white'
                    }
                }} />
            </Stack.Navigator>
        </SafeAreaView>
    );
};

export default HomeStackNavigator;
