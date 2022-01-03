/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import TextInputTask from '../components/TextInputTask';
import * as UserAPIs from '../services/UserAPIs';
import * as Config from '../services/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = async () => {
        setIsLoading(true);
        const loginToken = await UserAPIs.getUser(Config.config.base_url + Config.config.user_login, {
            email: userEmail,
            password: userPassword
        });
        if (loginToken) {
            setIsLoading(false);
            console.log(loginToken)
            await AsyncStorage.setItem('@user_token', loginToken);
            navigation.navigate('Home');

        }
        else {
            alert('Something wrong happened!')
        }
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>

            <TextInputTask
                onChangeText={(UserEmail) => {
                    setUserEmail(UserEmail);
                }}
                placeholder="Enter Email"
                keyboardType="email-address" />

            <TextInputTask
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password"
                secureTextEntry={true}
            />

            {
                isLoading ? <ActivityIndicator size={'large'} color={'#fff'} /> : null
            }
            <TouchableOpacity style={{
                backgroundColor: 'white',
                margin: 37,
                borderRadius: 10,
                borderColor: '#1E1A3C',
                padding: 12,
            }}
                onPress={
                    onSubmit

                }>
                <Text style={{
                    color: '#1E1A3C',
                    fontSize: 22,
                    fontWeight: '700',
                    textAlign: 'center',
                }}>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1E1A3C',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        padding: 25,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
