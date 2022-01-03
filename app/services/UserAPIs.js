/* eslint-disable prettier/prettier */
import axios from "axios";

const getUser = async (url = '', body = {}) => {
    var data = JSON.stringify(body);
    var config = {
        method: 'post',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    console.log({ config })
    try {
        const response = await axios(config);
        const { user, token } = response.data;
        return token;
    }
    catch (Err) {
        console.log(Err)
    }

};
async function createUser(url = '', body = {}) {

    var config = {
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: body
    };
    try {
        const res = await axios(config);
        const { user, token } = data;
        if (res.status == 200 && token !== null)
            return token;
    } catch (Err) {
        console.log(Err)
    }
}

export {
    getUser,
    createUser
}