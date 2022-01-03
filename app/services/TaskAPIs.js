/* eslint-disable prettier/prettier */
import axios from 'axios';
import { headers } from './config';
async function getAllTasks(url, body) {
    var config = {
        method: 'get',
        url,
        headers: headers,
    };
    try {
        const res = await axios(config);
        const { count, data } = res.data;

        if (res.status !== 200 && count <= 0) {
            return [];
        }
        return data;
    } catch (err) {
        console.log(err);
    }
}
async function addTask(url, task) {
    var data = JSON.stringify(task);
    var config = {
        method: 'post',
        url: url,
        headers: headers,
        data: data,
    };
    try {
        const res = await axios(config);
        const { success, data } = res.data;
        if (!success)
            return {};
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function editTask(url, task) {
    var data = JSON.stringify(task);
    var config = {
        method: 'put',
        url: url,
        headers: headers,
        data: data,
    };
    try {
        const res = await axios(config);
    } catch (err) {
        console.log(err);
    }
}

async function deleteTask(url) {
    var config = {
        method: 'delete',
        url: url,
        headers: headers,
    };
    try {
        const res = await axios(config);
        const { success, data } = res.data;
        if (success)
            return data;
        else
            return {};
    } catch (err) {
        console.log(err);
    }
}

export { addTask, editTask, deleteTask, getAllTasks };
