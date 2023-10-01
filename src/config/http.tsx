import axios from "axios";
import { getSession } from 'next-auth/react'

const session = getSession();
const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
    },
});

const setToken = (token: string) => {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { http, setToken }