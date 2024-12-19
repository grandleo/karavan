import { NextResponse, NextRequest } from 'next/server';
import {getCookie, removeCookie, setCookie} from "@/utils/cookieUtil";
import {decryptData, encryptData} from "@/utils/joseUtil";

const TOKEN_COOKIE_KEY = 'auth_token';
const EXPIRY_COOKIE_KEY = 'auth_token_expiry';

export const setToken = async (
    token: string,
    expiresIn: number,
    isServer: boolean = false,
    res?: NextResponse
) => {
    const encryptedToken = await encryptData(token);
    setCookie(TOKEN_COOKIE_KEY, encryptedToken, expiresIn, isServer, res);

    const expiryDate = new Date(Date.now() + expiresIn * 1000).toISOString();
    setCookie(EXPIRY_COOKIE_KEY, expiryDate, expiresIn, isServer, res);
};

export const getToken = async (
    isServer: boolean = false,
    req?: NextRequest
): Promise<string | null> => {
    const encryptedToken = getCookie(TOKEN_COOKIE_KEY, isServer, req);
    if (!encryptedToken) return null;

    const expiry = getCookie(EXPIRY_COOKIE_KEY, isServer, req);
    if (expiry && new Date(expiry) < new Date()) {
        removeCookie(TOKEN_COOKIE_KEY, isServer);
        removeCookie(EXPIRY_COOKIE_KEY, isServer);
        return null;
    }

    try {
        return await decryptData(encryptedToken);
    } catch (error) {
        // Если расшифровка не удалась, удаляем токен
        removeCookie(TOKEN_COOKIE_KEY, isServer);
        removeCookie(EXPIRY_COOKIE_KEY, isServer);
        return null;
    }
};

export const removeToken = (isServer: boolean = false, res?: NextResponse) => {
    removeCookie(TOKEN_COOKIE_KEY, isServer, res);
    removeCookie(EXPIRY_COOKIE_KEY, isServer, res);
};