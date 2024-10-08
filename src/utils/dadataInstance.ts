import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

interface DadataAxiosConfig {
    baseURL: string;
    headers: {
        'Content-Type': string;
        Accept: string;
        Authorization: string;
    };
    timeout: number;
}

// Получение API-токена из переменных окружения
const API_TOKEN = process.env.NEXT_PUBLIC_DADATA_API_TOKEN;

// Создание экземпляра Axios с настройками по умолчанию
const dadataInstance: AxiosInstance = axios.create({
    baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${API_TOKEN}`,
    },
    timeout: 5000, // Таймаут запроса в миллисекундах
} as DadataAxiosConfig);

// Добавление интерсепторов для обработки ответов и ошибок
dadataInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Можно обработать или модифицировать ответ здесь, если необходимо
        return response;
    },
    (error: AxiosError) => {
        // Глобальная обработка ошибок
        if (error.response) {
            // Сервер ответил с кодом статуса, выходящим за пределы 2xx
            console.error('Dadata API Error:', {
                status: error.response.status,
                data: error.response.data,
            });
        } else if (error.request) {
            // Запрос был сделан, но ответа не получено
            console.error('No response received from Dadata API:', error.request);
        } else {
            // Произошла ошибка при настройке запроса
            console.error('Error setting up Dadata API request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default dadataInstance;