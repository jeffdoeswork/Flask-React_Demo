import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:5000';
//I don't even thing i use this as my base URL, i just hard code the url's for the API's because i'm a noob
export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});