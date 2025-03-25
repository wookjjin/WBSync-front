import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_CONTEXT_PATH || 'http://localhost:5000',
  headers: {},
});

export default request;
