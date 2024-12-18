"use client";
import { useEffect, useState } from "react";
import {Button} from "@mantine/core";
import Link from "next/link";

export default function TelegramWebApp() {
    const [chatId, setChatId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        try {
            console.log("window.location.search:", window.location.search);
            const searchParams = new URLSearchParams(window.location.search);

            const chat_id = searchParams.get("chat_id");
            const bot_token = searchParams.get("token");

            console.log("Полученные параметры:", { chat_id, bot_token });

            if (chat_id) setChatId(chat_id);
            if (bot_token) setToken(bot_token);
        } catch (error) {
            console.error("Ошибка при получении параметров из URL:", error);
        }
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Telegram WebApp</h1>
            {chatId && token ? (
                <>
                    <p>Ваш chat_id: {chatId}</p>
                    <p>Ваш токен: {token}</p>

                    <Link href="orders" passHref>

                            Перейти в заказы

                    </Link>
                </>
            ) : (
                <p>Загрузка данных...</p>
            )}
        </div>
    );
}