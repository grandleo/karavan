"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function TelegramWebApp() {
    const searchParams = useSearchParams();
    const [chatId, setChatId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Получаем chat_id и token из URL параметров
        const chat_id = searchParams.get("chat_id");
        const token = searchParams.get("token");

        if (chat_id && token) {
            setChatId(chat_id);
            setToken(token);
        }
    }, [searchParams]);

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