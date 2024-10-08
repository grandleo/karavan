// Создание экземпляра Axios с настройками по умолчанию
import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {getToken} from "@/features/auth/utils/tokenUtil";

// Интерфейс для конфигурации Axios
interface HttpAxiosConfig {
    baseURL: string;
    headers: {
        'Content-Type': string;
        Accept: string;
        Authorization?: string; // Сделаем опциональным, так как будем устанавливать динамически
    };
    timeout: number;
}

// Получение API-токена из переменных окружения
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Создание экземпляра Axios с настройками по умолчанию
const http: AxiosInstance = axios.create({
    baseURL: API_URL, // Исправил на корректный формат URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
} as HttpAxiosConfig);

// Добавление интерсептора запросов для установки токена
http.interceptors.request.use(
    async (config) => {
        try {
            // Получаем токен
            const token = await getToken();

            if (token) {
                config.headers = config.headers ?? {};
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        } catch (error) {
            console.error('Error fetching token:', error);
            return config;
        }
    },
    (error) => {
        // Обработка ошибок при настройке запроса
        return Promise.reject(error);
    }
);


// Добавление интерсептора для обработки ответов и ошибок
http.interceptors.response.use(
    (response: AxiosResponse) => {
        // Можно обработать или модифицировать ответ здесь, если необходимо
        return response;
    },
    (error: AxiosError) => {
        // Глобальная обработка ошибок
        if (error.response) {
            // Сервер ответил с кодом статуса, выходящим за пределы 2xx
            console.error('HTTP API Error:', {
                status: error.response.status,
                data: error.response.data,
            });
        } else if (error.request) {
            // Запрос был сделан, но ответа не получено
            console.error('No response received from HTTP API:', error.request);
        } else {
            // Произошла ошибка при настройке запроса
            console.error('Error setting up HTTP API request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default http;