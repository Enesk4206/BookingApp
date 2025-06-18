import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers:{
        "Content-Type":"application/json",
    }
});


//add any request token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    const isAuthEndpoint = config.url.includes('/auth/login') || config.url.includes('/auth/register');

    if (token && !isAuthEndpoint) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});


export default api;