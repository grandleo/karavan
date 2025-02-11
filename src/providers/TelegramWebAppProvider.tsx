"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/features/auth/utils/tokenUtil";
import { setBotId } from "@/utils/botUtil";
import { Box, Center, Text } from "@mantine/core";
import http from "@/utils/http";
import {getUser, setUser} from "@/features/auth/utils/userUtil";
import {removeAllCookies} from "@/utils/cookieUtil";
import {setTgUser} from "@/features/auth/utils/tgUserUtil";
import {setTokenHash} from "@/features/auth/utils/tokenHashUtil"; // Импортируем настроенный Axios экземпляр

export default function TelegramWebAppProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUserState] = useState<any>(null); // Добавляем состояние для данных пользователя
    const router = useRouter();

    useEffect(() => {
        const initializeApp = async () => {
            try {
                setLoading(true);

                // Удаляем все куки

                // Проверяем, есть ли пользовательские данные
                const userData = await getUser();

                if (userData) {
                    setUserState(userData); // Устанавливаем данные пользователя
                    setLoading(false); // Завершаем загрузку
                    return;
                }

                // Получаем данные от Telegram WebApp
                const tg = window.Telegram?.WebApp;
                if (!tg) {
                    setError("Telegram WebApp не доступен");
                    setLoading(false);
                    return;
                }

                tg.ready();

                // 4. Получаем tokenHash
                const searchParams = new URLSearchParams(window.location.search);
                const tokenHash = searchParams.get("token_hash");

                // 5. Получаем tgUserData
                const tgUserData = tg.initDataUnsafe || null;

                // 6. Сохраняем tgUserData.user (если нужно)
                await setTgUser(tgUserData?.user);

                // 7. Ставим tokenHash в куки (без срока, или временно)
                await setTokenHash(tokenHash);

                // Отправляем запрос на сервер
                const response = await http.post(`/webapp/auth/verify`);

                const data = response.data;

                const { access_token, expires_in, user, bot_id } = data;

                // Сохраняем токен, bot_id и данные пользователя
                await setToken(access_token, expires_in);
                await setBotId(bot_id, expires_in);
                await setUser(user);

                setUserState(user); // Сохраняем данные пользователя

                // Устанавливаем задержку перед завершением загрузки
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            } catch (error: any) {
                if (error.response?.status === 403) {
                    setError(null);
                    setLoading(false);
                    router.push("/telegram/registration");
                    return;
                }

                if (error.response) {
                    setError(error.response.data.message || "Ошибка сервера");
                } else if (error.request) {
                    setError("Сервер не отвечает. Попробуйте позже.");
                } else {
                    setError(error.message);
                }
                setLoading(false);
            }
        };

        initializeApp();
    }, [router]);

    if (loading) {
        return (
            <Center style={{ height: "100vh", backgroundColor: "#436CFB" }}>
                <img src="/logo-webapp.svg" alt="Logo" style={{ maxWidth: "80%", maxHeight: "80%" }} />
            </Center>
        );
    }

    if (error) {
        return (
            <Center style={{ height: "100vh", backgroundColor: "#fff" }}>
                <div>Ошибка: {error}</div>
            </Center>
        );
    }

    return (
        <>
            <Box p="md">
                <Text>Данные пользователя:</Text>
                <pre>{JSON.stringify(user, null, 2)}</pre> {/* Простая распечатка объекта user */}
            </Box>
            {children}
        </>
    );
}