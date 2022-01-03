/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default TextInputTask = props => {
    const { onChangeText, renderRightAccessory, placeholder, keyboardType, secureTextEntry, } = props;
    const [value, setValue] = useState();
    //to handle add task text input
    const onChange = value => {
        onChangeText(value);
        setValue(null);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TextInput

                style={styles.inputField}
                value={value}
                placeholder={placeholder}
                onChangeText={text => {
                    setValue(text)
                    //if there is right accessory then user is adding task so we need to disable native event of text input to be controlled from the button
                    if (!renderRightAccessory)
                        onChangeText(text)
                }}
                placeholderTextColor={'#fff'}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
            {
                renderRightAccessory ?
                    <TouchableOpacity onPress={() => onChange(value)}>
                        <View>
                            <MaterialCommunityIcons name="arrow-up-bold-circle" size={35} color="white" />
                        </View>
                    </TouchableOpacity> : null
            }

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#fff',
        backgroundColor: '#3E3364',
        borderWidth: 1,
        marginHorizontal: 20,
        margin: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    inputField: {
        color: '#fff',
        padding: 20, flex: 1,
    },
    button: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
