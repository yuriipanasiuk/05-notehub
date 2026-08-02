import axios from 'axios';

const accessToken = import.meta.env.VITE_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
