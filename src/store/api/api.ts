import {createApi} from '@reduxjs/toolkit/query/react'
import {http} from "@/config/http";
import type {BaseQueryFn} from '@reduxjs/toolkit/query'
import axios from 'axios'
import type {AxiosRequestConfig, AxiosError} from 'axios'

const axiosBaseQuery =
    (
        {baseUrl}: { baseUrl: string } = {baseUrl: ''}
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
        async ({url, method, data, params, headers}) => {
            try {
                const result = await http({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers,
                })
                return {data: result.data}
            } catch (axiosError: any) {
                const err = axiosError as AxiosError

                if(axiosError.response.status === 401){
                    console.log('Авторизация не прошла')
                }

                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }

const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    tagTypes: [
        'User',
        'Specifications',
        'SpecificationValues',
        'Categories',
        'Products'
    ],
    endpoints: () => ({}),
})

export { api }