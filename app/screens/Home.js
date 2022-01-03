/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { TodoItem } from '../components/TodoItem';
import TextInputTask from '../components/TextInputTask';
import * as TaskAPIs from '../services/TaskAPIs';
import * as Config from '../services/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(undefined);
    AsyncStorage.getItem('@user_token').then(token => setToken(token));

    const addTask = async (task) => {
        setIsLoading(true);
        if (task == null) { return; }
        Keyboard.dismiss();
        const addTaskResult = await TaskAPIs.addTask(Config.config.base_url + Config.config.add_task,
            { 'description': task }, {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",

        });
        const { _id, completed, description } = addTaskResult;
        setTasks([...tasks, { _id, completed, description }]);
        setIsLoading(false);

    };
    const deleteTask = async (deleteIndex) => {
        setIsLoading(true);
        const task = tasks[deleteIndex];
        const deleteTaskResult = await TaskAPIs.deleteTask(Config.config.base_url + Config.config.delete_task + task?._id, {
            'Authorization': `Bearer ${token}`,

        })
        if (deleteTaskResult) {
            setTasks(tasks.filter((value, index) => index != deleteIndex));
        }
        setIsLoading(false);

    };
    useEffect(() => {
        setIsLoading(true);
        if (token) {
            TaskAPIs.getAllTasks(Config.config.base_url + Config.config.get_task, {
                'Authorization': `Bearer ${token}`,
            }).then((result) => {
                const parsedTasks = result?.map(task => {
                    return {
                        _id: task._id,
                        completed: task.completed,
                        description: task.description
                    };
                });
                if (parsedTasks?.length > 0) {
                    setIsLoading(false);
                    setTasks(parsedTasks);
                }
            });
        }
        setIsLoading(false);
    }, [token]);
    return (
        <SafeAreaView style={isDarkMode ? styles.container : {}}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={styles.heading}>TODO LIST</Text>
                    {
                        isLoading ?
                            <ActivityIndicator style={{ marginHorizontal: 90 }} size={'small'} color={'white'} />
                            : null
                    }
                </View>
                <FlatList
                    keyExtractor={({ item, index }) => index}
                    key={({ item, index }) => index}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={index} style={styles.taskContainer}>
                                <TodoItem index={index + 1} task={item} deleteTask={() => deleteTask(index)} />
                            </View>
                        );

                    }}
                    data={tasks}
                    contentContainerStyle={{ justifyContent: 'flex-start', }}
                    style={{ flex: 8, }}
                    ListFooterComponent={<TextInputTask onChangeText={addTask} renderRightAccessory={true} />}
                />

            </View>

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
    },
});

export default Home;
