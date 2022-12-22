import axios , { isCancel, AxiosError } from'axios';
// const  axios  =  requer ( 'axios' );

const api = axios.create({
   baseURL: 'http://localhost:3000', 
});

export default api;