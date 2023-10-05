import { createApi } from '@reduxjs/toolkit/query/react'
import {http} from "@/config/http";
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import {userApi} from "@/store/api/user.api";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            headers?: AxiosRequestConfig['headers']
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers }) => {
            try {
                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers,
                })
                return { data: result.data }
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://api.apteka.grand/api/',
    }),
    // baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    // reducerPath: 'api',
    tagTypes: [
        'User',
        'Specifications',
        'Categories',
    ],
    endpoints: () => ({}),
    // endpoints: (builder) => ({}),
    // endpoints: (builder) => ({
    //     getUser: builder.query({
    //         query: () => ({url: 'user-test', method: 'get'})
    //     })
    // }),
})