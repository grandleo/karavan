"use client";
import { useEffect, useState } from "react";

export default function TelegramWebApp() {
    const [chatId, setChatId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Получаем параметры из URL с использованием window.location
        const searchParams = new URLSearchParams(window.location.search);
        const chat_id = searchParams.get("chat_id");
        const bot_token = searchParams.get("token");

        if (chat_id && bot_token) {
            setChatId(chat_id);
            setToken(bot_token);
        }
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Telegram WebApp</h1>
            {chatId && token ? (
                <>
                    <p>Ваш chat_id: {chatId}</p>
                    <p>Ваш токен: {token}</p>
                </>
            ) : (
                <p>Загрузка данных...</p>
            )}
        </div>
    );
}