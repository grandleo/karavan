import axios from "axios";

const DaDataAPI = process.env.NEXT_PUBLIC_DADATA_API;

export const daData = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + DaDataAPI
    },
});