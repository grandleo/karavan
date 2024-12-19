import { NextResponse, NextRequest } from 'next/server';
import { getCookie, setCookie, removeCookie } from "@/utils/cookieUtil";
import { encryptData, decryptData } from "@/utils/joseUtil";

const BOT_COOKIE_KEY = 'bot_id';
const BOT_EXPIRY_COOKIE_KEY = 'bot_id_expiry';

export const setBotId = async (
    botId: string,
    expiresIn: number,
    isServer: boolean = false,
    res?: NextResponse
): Promise<void> => {
    // Шифруем botId перед сохранением
    const encryptedBotId = await encryptData(botId);
    setCookie(BOT_COOKIE_KEY, encryptedBotId, expiresIn, isServer, res);

    // Сохраняем дату истечения
    const expiryDate = new Date(Date.now() + expiresIn * 1000).toISOString();
    setCookie(BOT_EXPIRY_COOKIE_KEY, expiryDate, expiresIn, isServer, res);
};

export const getBotId = async (
    isServer: boolean = false,
    req?: NextRequest
): Promise<string | null> => {
    // Получаем зашифрованный botId из cookies
    const encryptedBotId = getCookie(BOT_COOKIE_KEY, isServer, req);
    if (!encryptedBotId) return null;

    // Проверяем истечение срока действия
    const expiry = getCookie(BOT_EXPIRY_COOKIE_KEY, isServer, req);
    if (expiry && new Date(expiry) < new Date()) {
        await removeBotId(isServer);
        return null;
    }

    try {
        // Расшифровываем botId перед возвратом
        return await decryptData(encryptedBotId);
    } catch (error) {
        // Если ошибка расшифровки, удаляем botId из cookies
        await removeBotId(isServer);
        return null;
    }
};

export const removeBotId = async (
    isServer: boolean = false,
    res?: NextResponse
): Promise<void> => {
    removeCookie(BOT_COOKIE_KEY, isServer, res);
    removeCookie(BOT_EXPIRY_COOKIE_KEY, isServer, res);
};