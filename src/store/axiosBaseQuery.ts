import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';
import {removeUser} from "@/features/auth/utils/userUtil";
import {removeToken} from "@/features/auth/utils/tokenUtil";

// Интерфейсы для аргументов запроса и ошибок
interface AxiosBaseQueryArgs {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: unknown;
    params?: Record<string, unknown>;
}

interface AxiosBaseQueryError {
    status?: number;
    data?: unknown;
    message?: string;
}

/**
 * Создаёт базовый query для RTK Query, используя настроенный axiosInstance.
 * @returns Функция baseQuery, совместимая с RTK Query.
 */
const axiosBaseQuery =
    (): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
        async ({ url, method, data, params }) => {
            try {
                const result = await axiosInstance({
                    url,
                    method,
                    data,
                    params,
                });
                return { data: result.data };
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    const err = error as AxiosError;

                    if (err.response?.status === 401) {
                        removeToken();
                        removeUser();
                        // серверный редирект
                        window.location.href = '/';
                    }

                    return {
                        error: {
                            status: err.response?.status,
                            data: err.response?.data || err.message,
                        },
                    };
                }
                return {
                    error: {
                        message: 'An unknown error occurred',
                    },
                };
            }
        };

export default axiosBaseQuery;