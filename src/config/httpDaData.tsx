import axios from "axios";

const DaDataAPI = process.env.NEXT_PUBLIC_DADATA_API;

export const httpDaData = axios.create({
    baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + DaDataAPI
    }
})