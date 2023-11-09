'use client'

import { useRouter } from 'next/router';
import axios from 'axios';
import {useState} from "react";
import {Cookies} from "react-cookie";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/login', { email, password });

            Cookies.set('access_token', res.data.access_token);
            router.push(`/${res.data.role}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;