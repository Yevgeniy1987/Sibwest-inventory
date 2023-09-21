import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333'
});

const accessToken = window.localStorage.getItem('token');

if (accessToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

api.interceptors.response.use(
  (resp) => [resp.data, null],
  (error) => [null, error]
);
