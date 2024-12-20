"use client";
import { useEffect, useState } from "react";
import {Container, Text, Loader, Stack, Button} from "@mantine/core";
import Script from "next/script";
import axios from "axios";
import { setCookie, getCookie, removeCookie } from "@/utils/cookieUtil";
import Link from "next/link";
import {setToken} from "@/features/auth/utils/tokenUtil";
import {getBotId, setBotId} from "@/utils/botUtil";

export default function TelegramWebApp() {
    const [debugInfo, setDebugInfo] = useState<string>(""); // Для отладки
    const [userInfo, setUserInfo] = useState<any>(null); // Информация о пользователе
    const [loading, setLoading] = useState<boolean>(true); // Индикатор загрузки
    const [error, setError] = useState<string | null>(null); // Сообщения об ошибках

    // Массив уровней категорий. Каждый уровень - объект с parentId и title
    const [categoryLevels, setCategoryLevels] = useState<{ parentId: number; title: string }[]>([
        { parentId: 0, title: "Выберите категорию" },
    ]);

    const [botIdVal, setBotIdVal] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const tg = window.Telegram?.WebApp;

        if (!tg) {
            setError("Telegram WebApp не доступен");
            setLoading(false);
            return;
        }

        tg.ready();

        // Массив уровней категорий. Каждый уровень - объект с parentId и title
        const [categoryLevels, setCategoryLevels] = useState<{ parentId: number; title: string }[]>([
            { parentId: 0, title: "Выберите категорию" },
        ]);

        const fetchData = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const tokenHash = searchParams.get("token_hash");
            const chatId = searchParams.get("chat_id");

            const userData = tg.initDataUnsafe || null;

            if (!tokenHash || !userData) {
                setError("Недостаточно данных для верификации");
                setLoading(false);
                return;
            }

            setDebugInfo(JSON.stringify({ tokenHash, chatId, userData }, null, 2));

            try {
                const response = await axios.post(`https://3f19-193-46-56-10.ngrok-free.app/api/webapp/verify`, {
                    token_hash: tokenHash,
                    chat_id: chatId,
                    user_data: userData,
                });

                setLoading(false);

                if (response.data.error) {
                    console.error("Ошибка проверки:", response.data.error);
                    setError(response.data.error);
                } else {
                    console.log("API Response:", response.data);

                    // Извлекаем данные
                    const { access_token, expires_in, user, bot_id } = response.data;

                    // Сохраняем токен и данные пользователя
                    await setToken(access_token, expires_in); // Теперь await используется в правильном контексте
                    await setBotId(bot_id, expires_in);
                    setCookie("user_data", JSON.stringify(user), expires_in);

                    // Теперь получаем bot_id через getBotId()
                    const bId = await getBotId();
                    setBotIdVal(bId);

                    // Устанавливаем данные пользователя в состояние
                    setUserInfo(user);
                    console.log("Успешная проверка:", response.data);
                }
            } catch (error) {
                setLoading(false);
                console.error("Ошибка запроса:", error.response?.data || error.message);
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const logout = () => {
        removeCookie("auth_token");
        removeCookie("user_data");
        setUserInfo(null);
        console.log("Пользователь вышел из системы");
    };

    // Для каждого уровня запрашиваем категории
    // Чтобы не плодить кучу однотипных запросов, можно для каждого уровня использовать один и тот же хук
    // Но RTK Query хук один раз вызывает. В нашем случае можно сделать кастомную логику:
    // Мы можем сделать map по уровням и для каждого уровня вызывать hook (через динамический параметр).
    // Однако вызов хуков в цикле — не лучший паттерн.
    // Вместо этого будем загружать данные по мере необходимости: когда добавляем уровень — делаем запрос, сохраняем в состояние.

    // Вариант: сделать отдельный стейт с данными по уровням
    const [categoriesDataByLevel, setCategoriesDataByLevel] = useState<{[parentId: number]: any[]}>({});

    // Подгружаем данные при изменении массива уровней или при появлении userInfo
    useEffect(() => {
        const loadCategoriesForLevel = async (parentId: number) => {
            if (!botIdVal) return;
            try {
                const response = await axios.get("/api/fetchCategories", {
                    params: {
                        bot_id: botIdVal,
                        parentId: parentId
                    }
                });
                const data = response.data;
                setCategoriesDataByLevel((prev) => ({ ...prev, [parentId]: data }));
            } catch (e) {
                console.error(e);
            }
        };

        const lastLevel = categoryLevels[categoryLevels.length - 1];
        if (lastLevel && botIdVal && categoriesDataByLevel[lastLevel.parentId] === undefined) {
            loadCategoriesForLevel(lastLevel.parentId);
        }
    }, [categoryLevels, botIdVal]);

    const handleCategorySelect = (category: any) => {
        // При выборе категории проверяем есть ли у неё подкатегории
        if (category.children_count > 0) {
            // Добавляем новый уровень
            const newLevel = {
                parentId: category.id,
                title: "Выберите подкатегорию" // или можно динамически формировать, например "Следующий уровень"
            };
            setCategoryLevels((prev) => [...prev, newLevel]);
        } else {
            // Нет подкатегорий, просто можно вывести сообщение или остановиться
            console.log("Нет подкатегорий для категории", category.id);
        }
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
                        {/*<button onClick={logout}>Выйти</button>*/}
                        <Link href="/telegram/orders">Заказы</Link>

                        {/* Блок для каскадного выбора категорий */}
                        <Stack spacing="xl" mt="xl">
                            {categoryLevels.map((level, index) => {
                                const categories = categoriesDataByLevel[level.parentId];
                                return (
                                    <div key={level.parentId}>
                                        <Text weight={600} mb="md">{level.title}</Text>
                                        {categories === undefined ? (
                                            <Loader />
                                        ) : categories.length > 0 ? (
                                            <Stack spacing="xs">
                                                {categories.map((cat: any) => (
                                                    <Button key={cat.id} onClick={() => handleCategorySelect(cat)}>
                                                        {cat.name}
                                                    </Button>
                                                ))}
                                            </Stack>
                                        ) : (
                                            <Text>Нет категорий для отображения</Text>
                                        )}
                                    </div>
                                );
                            })}
                        </Stack>
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