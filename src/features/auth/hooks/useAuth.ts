import {useState} from "react";
import {useRouter} from "next/navigation";
import http from "@/utils/http";
import {setToken} from "@/features/auth/utils/tokenUtil";
import {setUser} from "@/features/auth/utils/userUtil";
import {notify} from "@/utils/notify";

interface SendCodePayload {
    email: string;
}

interface CheckCodePayload {
    email: string;
    code: string;
}

interface LoginCredentials {
    email: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    // Добавьте другие поля по необходимости
}

interface UseAuthReturn {
    user: User | null;
    sendCode: (payload: SendCodePayload) => Promise<void>;
    checkCode: (payload: CheckCodePayload) => Promise<boolean>;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (userData: any) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export const useAuth = (): UseAuthReturn => {
    const [user, setUserState] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const sendCode = async (payload: SendCodePayload) => {
        setIsLoading(true);
        setError(null);
        try {
            await http.post('/auth/send-code', payload);
        } catch (err: any) {
            throw err; // Пробрасываем ошибку для обработки в компоненте
        } finally {
            setIsLoading(false);
        }
    };

    const checkCode = async (payload: CheckCodePayload): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await http.post('/auth/check-code', payload);
            return response.data.registered; // Возвращаем true или false
        } catch (err: any) {
            console.error('Ошибка при проверке кода:', err);
            setError(err.response?.data?.message || 'Неверный код');
            throw err;
        } finally {
            setIsLoading(false);
            console.log('checkCode установил isLoading в false');
        }
    };

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await http.post('/auth/login', credentials);
            const { access_token, expires_in } = response.data;
            if (access_token) {
                await setToken(access_token, expires_in);
                const userResponse = await http.post('/auth/user', credentials);
                const userData: User = userResponse.data;
                await setUser(userData, expires_in);
                setUserState(userData);

                console.log(userData);

                router.push(userData.role); // Замените на нужный маршрут
            } else {
                throw new Error('Токен не получен');
            }
        } catch (err: any) {
            console.error('Ошибка при входе:', err);
            setError(err.response?.data?.message || 'Ошибка при входе');
            throw err;
        } finally {
            setIsLoading(false);
            console.log('login установил isLoading в false');
        }
    };

    const registerUser = async (userData: any) => {
        setIsLoading(true);
        setError(null);
        try {
            await http.post('/auth/register', userData);
            await login({ email: userData.email });
        } catch (err: any) {
            console.error('Ошибка при регистрации:', err);
            setError(err.response?.data?.message || 'Ошибка при регистрации');
            throw err; // Пробрасываем ошибку для обработки в компоненте
        } finally {
            setIsLoading(false);
        }
    };

    return {
        user,
        sendCode,
        checkCode,
        login,
        register: registerUser,
        isLoading,
        error
    };
};