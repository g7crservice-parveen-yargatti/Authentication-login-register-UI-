import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api/auth',
    timeout: 5000,
    timeoutErrorMessage: 'Operation timed out',
    headers:{' Content-Type': 'application/json'}
})
