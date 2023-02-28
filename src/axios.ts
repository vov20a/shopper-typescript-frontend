import axios, { AxiosHeaders } from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
//middleware before any request-add new field(Authorization) to headers 
instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if (config.headers) {
        (config.headers as AxiosHeaders).set('Authorization', token);
        // console.log('config', config.headers, token)
        return config;
    }
    else {
        config.headers = {
            Authorization: token,
        }

        return config;
    }
    //  console.log('config', config.headers)
    // config.headers.Authorization = window.localStorage.getItem('token');
    //return config;
});

export default instance;