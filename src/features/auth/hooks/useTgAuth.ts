import { useState } from "react";
import { useRouter } from "next/navigation";
import http from "@/utils/http";
import { setToken } from "@/features/auth/utils/tokenUtil";
import { setUser } from "@/features/auth/utils/userUtil";

interface SendCodePayload {
    email: string;
    lang?: string; // Если нужно передавать язык
}

interface CheckCodePayload {
    email: string;
    code: string;
}

interface LoginCredentials {
    email: string;
}

interface RegisterPayload {
    email: string;
    pin: string;
    name: string;
    phone: string;
    company: string;
    lang?: string;
    // и другие поля, если нужно
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    // добавьте поля по необходимости
}

interface UseTgAuthReturn {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    sendCode: (payload: SendCodePayload) => Promise<void>;
    checkCode: (payload: CheckCodePayload) => Promise<boolean>;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (userData: RegisterPayload) => Promise<void>;
}

/**
 * Хук для авторизации и регистрации в «телеграм»-версии (или другом webApi)
 * Отличается от useAuth тем, что у вас могут быть другие роуты
 * или иная логика на сервере.
 */
export const useTgAuth = (): UseTgAuthReturn => {
    const [user, setUserState] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    // Аналог sendCode, только роут, например, «/webapp/auth/send-code»
    const sendCode = async (payload: SendCodePayload) => {
        setIsLoading(true);
        setError(null);

        try {
            // Пример: в «телеграм»-версии может быть другой маршрут:
            // await http.post('/webapp/auth/send-code', payload);
            await http.post('/webapp/auth/send-code', payload);
        } catch (err: any) {
            setError(err.response?.data?.message || "Ошибка при отправке кода");
            throw err; // пробрасываем ошибку дальше
        } finally {
            setIsLoading(false);
        }
    };

    // Аналог checkCode, снова другой роут «/webapp/auth/check-code»
    const checkCode = async (payload: CheckCodePayload): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await http.post('/webapp/auth/check-code', payload);
            return response.data.registered; // true или false (зарегистрирован ли)
        } catch (err: any) {
            setError(err.response?.data?.message || "Неверный код");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Аналог login, снова используем свой роут «/webapp/auth/login»
    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await http.post('/webapp/auth/verify', credentials);
            const { access_token, expires_in, user } = response.data;

            if (access_token) {
                await setToken(access_token, expires_in);

                // Если нужно получить данные пользователя:
                // const userResponse = await http.post('/webapp/auth/user', credentials);
                // const userData: User = userResponse.data;
                await setUser(user);
                setUserState(user);

                // Например, редиректим в зависимости от роли
                router.push('/telegram');
            } else {
                throw new Error("Токен не получен");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Ошибка при входе");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Аналог registerUser, снова другой роут «/webapp/auth/register»
    const register = async (userData: RegisterPayload) => {
        setIsLoading(true);
        setError(null);

        try {
            await http.post('/webapp/auth/register', userData);
            // После регистрации сразу авторизуем
            // await login({ email: userData.email });
        } catch (err: any) {
            setError(err.response?.data?.message || "Ошибка при регистрации");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        user,
        isLoading,
        error,
        sendCode,
        checkCode,
        login,
        register,
    };
};