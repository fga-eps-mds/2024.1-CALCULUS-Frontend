import axios from 'axios';

export const userApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_USER!,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studioMakerApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_STUDIO!,
  headers: {
    'Content-Type': 'application/json',
  },
});
