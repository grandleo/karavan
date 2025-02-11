// utils/tokenHashUtil.ts

import { NextRequest, NextResponse } from 'next/server';
import { encryptData, decryptData } from '@/utils/joseUtil';
import { getCookie, setCookie, removeCookie } from '@/utils/cookieUtil';

const TOKEN_HASH_COOKIE_KEY = 'token_hash_cookie';
const TOKEN_HASH_EXPIRY_COOKIE_KEY = 'token_hash_cookie_expiry';

/**
 * Сохранить tokenHash в зашифрованной куке
 */
export const setTokenHash = async (
    tokenHash: string,
    expiresIn?: number,          // аналогично setUser / setTgUser
    isServer: boolean = false,
    res?: NextResponse
) => {
    // Шифруем перед сохранением (если хотите — можно хранить и без шифрования)
    const encrypted = await encryptData(tokenHash);

    // Ставим основную куку
    setCookie(TOKEN_HASH_COOKIE_KEY, encrypted, expiresIn, isServer, res);

    // Ставим куку с датой истечения
    if (expiresIn && expiresIn > 0) {
        const expiryDate = new Date(Date.now() + expiresIn * 1000).toISOString();
        setCookie(TOKEN_HASH_EXPIRY_COOKIE_KEY, expiryDate, expiresIn, isServer, res);
    }
};

/**
 * Получить tokenHash из куки
 */
export const getTokenHash = async (
    isServer: boolean = false,
    req?: NextRequest
): Promise<string | null> => {
    const encrypted = getCookie(TOKEN_HASH_COOKIE_KEY, isServer, req);
    if (!encrypted) return null;

    const expiry = getCookie(TOKEN_HASH_EXPIRY_COOKIE_KEY, isServer, req);
    if (expiry && new Date(expiry) < new Date()) {
        removeTokenHash(isServer);
        return null;
    }

    try {
        const decrypted = await decryptData(encrypted);
        return decrypted; // это ваш исходный tokenHash
    } catch (error) {
        removeTokenHash(isServer);
        return null;
    }
};

/**
 * Удалить tokenHash из куки
 */
export const removeTokenHash = (
    isServer: boolean = false,
    res?: NextResponse
) => {
    removeCookie(TOKEN_HASH_COOKIE_KEY, isServer, res);
    removeCookie(TOKEN_HASH_EXPIRY_COOKIE_KEY, isServer, res);
};