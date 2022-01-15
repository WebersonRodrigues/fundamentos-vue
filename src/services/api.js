import axios from "axios";
import utilsStorage from '../utils/storage';

const api = axios.create({
    baseURL: 'http://localhost:3400'
});

api.interceptors.request.use((config) => {
    let token = utilsStorage.obterTokenNaStorage();
    config.headers.Authorization = token;
    return config;
});



export default api;