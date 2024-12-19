"use client";
import { useEffect, useState } from "react";
import { Container, Text, Loader } from "@mantine/core";
import Script from "next/script";
import axios from "axios";
import { setCookie, getCookie, removeCookie } from "@/utils/cookieUtil";

export default function TelegramWebApp() {
    const [debugInfo, setDebugInfo] = useState<string>(""); // Для отладки
    const [userInfo, setUserInfo] = useState<any>(null); // Информация о пользователе
    const [loading, setLoading] = useState<boolean>(true); // Индикатор загрузки
    const [error, setError] = useState<string | null>(null); // Сообщения об ошибках

    useEffect(() => {
        if (typeof window === "undefined") return;

        const tg = window.Telegram?.WebApp;

        if (!tg) {
            setError("Telegram WebApp не доступен");
            setLoading(false);
            return;
        }

        tg.ready();
        console.log("Telegram WebApp готов");

        const searchParams = new URLSearchParams(window.location.search);
        const tokenHash = searchParams.get("token_hash");
        const chatId = searchParams.get("chat_id");

        console.log("token_hash:", tokenHash);
        console.log("chat_id:", chatId);

        const userData = tg.initDataUnsafe || null;

        if (!tokenHash || !userData) {
            setError("Недостаточно данных для верификации");
            setLoading(false);
            return;
        }

        setDebugInfo(JSON.stringify({ tokenHash, chatId, userData }, null, 2));

        axios
            .post(`https://3f19-193-46-56-10.ngrok-free.app/api/webapp/verify`, {
                token_hash: tokenHash,
                chat_id: chatId,
                user_data: userData,
            })
            .then((response) => {
                setLoading(false);

                if (response.data.error) {
                    console.error("Ошибка проверки:", response.data.error);
                    setError(response.data.error);
                } else {
                    const { access_token, expires_in } = response.data[2]; // Токен
                    const user = response.data[1]; // Данные пользователя

                    setCookie("auth_token", access_token, expires_in);
                    setCookie("user_data", JSON.stringify(user), expires_in);

                    setUserInfo(user);
                    console.log("Успешная проверка:", response.data);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error("Ошибка запроса:", error.response?.data || error.message);
                setError(error.message);
            });
    }, []);

    const logout = () => {
        removeCookie("auth_token");
        removeCookie("user_data");
        setUserInfo(null);
        console.log("Пользователь вышел из системы");
    };

    return (
        <>
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                strategy="beforeInteractive"
                onError={() => {
                    setError("Не удалось загрузить Telegram WebApp Script");
                    setLoading(false);
                }}
            />
            <Container>
                <Text weight={500} size="lg" style={{ marginBottom: "1rem" }}>
                    Telegram WebApp Debug Info
                </Text>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Text weight={700} color="red">
                        Ошибка: {error}
                    </Text>
                ) : userInfo ? (
                    <div>
                        <Text weight={700} style={{ marginBottom: "1rem" }}>
                            Информация о пользователе:
                        </Text>
                        <Text>Имя: {userInfo.full_name}</Text>
                        <Text>Роль: {userInfo.role}</Text>
                        <Text>Язык: {userInfo.lang}</Text>
                        <button onClick={logout}>Выйти</button>
                    </div>
                ) : (
                    <Text weight={700} color="red">
                        Не удалось получить данные о пользователе.
                    </Text>
                )}

                <pre
                    style={{
                        background: "#f4f4f4",
                        padding: "1rem",
                        borderRadius: "8px",
                        overflowX: "auto",
                        marginTop: "1rem",
                    }}
                >
                    {debugInfo}
                </pre>
            </Container>
        </>
    );
}