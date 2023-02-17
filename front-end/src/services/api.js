import axios  from'axios';

const api = axios.create({
   baseURL: 'http://localhost:3337', 
});

export default api;