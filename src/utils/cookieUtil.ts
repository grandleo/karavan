import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import UniversalCookie from 'universal-cookie';

const cookieOptions = {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
};

// Обработка куки на клиенте
const cookiesClient = new UniversalCookie();

export const setCookie = (
    key: string,
    value: string,
    expiresIn: number,
    isServer: boolean = false,
    res?: NextResponse
) => {
    const expiryDate = new Date(Date.now() + expiresIn * 1000);

    if (isServer && res) {
        // Серверная сторона: устанавливаем куки в ответе
        res.cookies.set(key, value, {
            ...cookieOptions,
            expires: expiryDate,
        });
    } else {
        // Клиентская сторона
        cookiesClient.set(key, value, {
            ...cookieOptions,
            expires: expiryDate,
        });
    }
};

export const getCookie = (key: string, isServer: boolean = false, req?: NextRequest): string | undefined => {
    if (isServer && req) {
        const cookieHeader = req.headers.get('cookie');
        const parsedCookies = parse(cookieHeader || '');
        return parsedCookies[key];
    } else {
        return cookiesClient.get(key);
    }
};

export const removeCookie = (key: string, isServer: boolean = false, res?: NextResponse) => {
    if (isServer && res) {
        res.cookies.set(key, '', { ...cookieOptions, maxAge: -1 });
    } else {
        cookiesClient.remove(key, cookieOptions);
    }
};