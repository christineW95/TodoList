const config = {
    base_url: 'https://api-nodejs-todolist.herokuapp.com',
    user: '/user',
    user_login: '/user/login',
    user_register: '/user/register',
    add_task: '/task',
    get_task: '/task',
    delete_task: '/task/'

}
const headers = {
    "Content-Type": "application/json",
    // "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQxYTlkMzI3NTE0MTAwMTcyZGEyNGEiLCJpYXQiOjE2NDExMzE3MDd9.NeJlpCz_Hud0rFg82Zjq9o3HpPuciZbPQwQ9UK90agw'
}

export {
    config,
    headers
}