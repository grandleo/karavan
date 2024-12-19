import axios, { AxiosError } from 'axios';
import {getToken} from "@/features/auth/utils/tokenUtil";
import {getBotId} from "@/utils/botUtil";

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

        // Получаем bot_id
        const botId = await getBotId();

        if (token) {
            // Обеспечиваем, что headers определён
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Добавляем bot_id в зависимости от метода запроса
        if (botId) {
            if (config.method === 'get') {
                // Для GET-запросов добавляем bot_id в параметры
                config.params = {
                    ...(config.params || {}),
                    bot_id: botId,
                };
            } else if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
                // Для POST/PUT/PATCH-запросов добавляем bot_id в тело запроса
                config.data = {
                    ...(config.data || {}),
                    bot_id: botId,
                };
            }
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;