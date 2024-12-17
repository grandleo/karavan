"use client";
import {useEffect, useState} from "react";
import axios from "axios";


interface TelegramUser {
    id: number; // chat_id
    first_name: string;
    last_name?: string;
    username?: string;
}

export default function TelegramWebApp() {
    const [userData, setUserData] = useState<TelegramUser | null>(null);

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();

            // Получаем данные пользователя
            const user = tg.initDataUnsafe?.user as TelegramUser;

            if (user) {
                setUserData(user);
            }
        }
    }, []);

    const sendChatIdToServer = async () => {
        try {
            if (!userData) return;

            // chat_id = user.id из Telegram API
            const data = {
                chat_id: userData.id,
                message: "Привет! Это сообщение отправлено через WebApp.",
            };

            // Отправляем данные на ваш сервер
            const response = await axios.post("/api/send-message", data);

            alert("Сообщение отправлено!");
            console.log("Ответ сервера:", response.data);
        } catch (error) {
            console.error("Ошибка при отправке:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>WebApp Telegram</h1>
            {userData ? (
                <>
                    <p>
                        Привет, {userData.first_name} {userData.last_name || ""}!
                    </p>
                    <p>Ваш chat_id: {userData.id}</p>
                    <button
                        onClick={sendChatIdToServer}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#0088cc",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Отправить chat_id на сервер
                    </button>
                </>
            ) : (
                <p>Загрузка данных пользователя...</p>
            )}
        </div>
    );
}