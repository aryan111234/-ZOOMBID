import axios from 'axios';
export const axiosInstance = axios.create({
    headers: {
        authorization : `Bearer ${localstorage.getItem('token')}`
    }
})