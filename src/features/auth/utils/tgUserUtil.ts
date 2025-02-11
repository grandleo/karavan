import { NextResponse, NextRequest } from 'next/server';
import { encryptData, decryptData } from '@/utils/joseUtil';
import { getCookie, setCookie, removeCookie } from '@/utils/cookieUtil';

const TG_USER_COOKIE_KEY = 'tg_user';                 // Название куки, в которой будут храниться данные о TG user
const TG_USER_EXPIRY_COOKIE_KEY = 'tg_user_expiry';   // Название куки, в которой будем хранить дату истечения

/**
 * Сохранить tgUserData в куки
 * @param tgUserData - объект с данными пользователя из Telegram WebApp (tg.initDataUnsafe)
 * @param expiresIn - время жизни куки в секундах (аналогично тому, как для access_token)
 * @param isServer - признак, что вызов идёт на сервере, чтобы корректно работать с серверными куки
 * @param res - объект NextResponse (если нужно управлять куками на сервере)
 */
export const setTgUser = async (
    tgUserData: object,
    expiresIn?: number,
    isServer: boolean = false,
    res?: NextResponse
) => {
    // сериализуем и шифруем данные
    const tgUserJson = JSON.stringify(tgUserData);
    const encryptedTgUser = await encryptData(tgUserJson);

    // Устанавливаем куки
    setCookie(TG_USER_COOKIE_KEY, encryptedTgUser, expiresIn, isServer, res);

    // Устанавливаем куки для даты истечения (если expiresIn > 0)
    if (expiresIn && expiresIn > 0) {
        const expiryDate = new Date(Date.now() + expiresIn * 1000).toISOString();
        setCookie(TG_USER_EXPIRY_COOKIE_KEY, expiryDate, expiresIn, isServer, res);
    }
};

/**
 * Получить tgUserData из куки
 * @param isServer - признак, что вызов идёт на сервере
 * @param req - объект NextRequest (если нужно получать куки на сервере)
 */
export const getTgUser = async (
    isServer: boolean = false,
    req?: NextRequest
): Promise<object | null> => {
    const encryptedTgUser = getCookie(TG_USER_COOKIE_KEY, isServer, req);
    if (!encryptedTgUser) return null;

    const expiry = getCookie(TG_USER_EXPIRY_COOKIE_KEY, isServer, req);
    if (expiry && new Date(expiry) < new Date()) {
        removeCookie(TG_USER_COOKIE_KEY, isServer);
        removeCookie(TG_USER_EXPIRY_COOKIE_KEY, isServer);
        return null;
    }

    try {
        const decryptedTgUser = await decryptData(encryptedTgUser);
        return JSON.parse(decryptedTgUser);
    } catch (error) {
        // Если расшифровка не удалась, удаляем данные
        removeCookie(TG_USER_COOKIE_KEY, isServer);
        removeCookie(TG_USER_COOKIE_KEY, isServer);
        return null;
    }
};

/**
 * Удалить tgUserData из куки
 * @param isServer - признак, что вызов идёт на сервере
 * @param res - объект NextResponse (если нужно управлять куками на сервере)
 */
export const removeTgUser = (
    isServer: boolean = false,
    res?: NextResponse
) => {
    removeCookie(TG_USER_COOKIE_KEY, isServer, res);
    removeCookie(TG_USER_EXPIRY_COOKIE_KEY, isServer, res);
};