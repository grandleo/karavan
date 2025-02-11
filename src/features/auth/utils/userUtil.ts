import { NextResponse, NextRequest } from 'next/server';
import {decryptData, encryptData} from "@/utils/joseUtil";
import {getCookie, removeCookie, setCookie} from "@/utils/cookieUtil";

const USER_COOKIE_KEY = 'user_data';
const USER_EXPIRY_COOKIE_KEY = 'user_data_expiry';

export const setUser = async (
    userData: object,
    expiresIn?: number,
    isServer: boolean = false,
    res?: NextResponse
) => {
    const userJson = JSON.stringify(userData);
    const encryptedUser = await encryptData(userJson);

    // Устанавливаем куки для пользователя
    setCookie(USER_COOKIE_KEY, encryptedUser, expiresIn, isServer, res);

    // Проверяем expiresIn перед использованием
    if (expiresIn && expiresIn > 0) {
        const expiryDate = new Date(Date.now() + expiresIn * 1000).toISOString();
        setCookie(USER_EXPIRY_COOKIE_KEY, expiryDate, expiresIn, isServer, res);
    }
};

export const getUser = async (
    isServer: boolean = false,
    req?: NextRequest
): Promise<object | null> => {
    const encryptedUser = getCookie(USER_COOKIE_KEY, isServer, req);
    if (!encryptedUser) return null;

    const expiry = getCookie(USER_EXPIRY_COOKIE_KEY, isServer, req);
    if (expiry && new Date(expiry) < new Date()) {
        removeCookie(USER_COOKIE_KEY, isServer);
        removeCookie(USER_EXPIRY_COOKIE_KEY, isServer);
        return null;
    }

    try {
        const decryptedUser = await decryptData(encryptedUser);
        return JSON.parse(decryptedUser);
    } catch (error) {
        // Если расшифровка не удалась, удаляем данные пользователя
        removeCookie(USER_COOKIE_KEY, isServer);
        removeCookie(USER_EXPIRY_COOKIE_KEY, isServer);
        return null;
    }
};

export const removeUser = (isServer: boolean = false, res?: NextResponse) => {
    removeCookie(USER_COOKIE_KEY, isServer, res);
    removeCookie(USER_EXPIRY_COOKIE_KEY, isServer, res);
};