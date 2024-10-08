import axios, { AxiosError } from 'axios';
import {getToken} from "@/features/auth/utils/tokenUtil";

// Создаём экземпляр axios с базовым URL из переменных окружения
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    // Добавьте другие настройки, если необходимо
});

// Добавление интерсептора для добавления токена авторизации
axiosInstance.interceptors.request.use(
    async (config) => {
        // Получите ваш токен из хранилища, контекста или другого источника
        const token = await getToken();

        if (token) {
            // Обеспечиваем, что headers определён
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;