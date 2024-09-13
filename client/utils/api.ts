
import axios from 'axios';
import { getAuthToken } from '@/utils/useAuth';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Intercepter for each api call
apiClient.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
