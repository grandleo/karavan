"use client";
import { useEffect, useState } from "react";
import { Container, Text, Loader } from "@mantine/core";
import Script from "next/script";
import axios from "axios";

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

        // Извлечение параметров из URL
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

        // Логируем для отладки
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
                    setUserInfo(response.data); // Устанавливаем данные пользователя
                    console.log("Успешная проверка:", response.data);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error("Ошибка запроса:", error.response?.data || error.message);
                setError(error.message);
            });
    }, []);

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

                {/* Состояние загрузки */}
                {loading ? (
                    <Loader />
                ) : error ? (
                    // Если есть ошибка
                    <Text weight={700} color="red">
                        Ошибка: {error}
                    </Text>
                ) : userInfo ? (
                    // Если данные успешно получены
                    <div>
                        <Text weight={700} style={{ marginBottom: "1rem" }}>
                            Информация о боте:
                        </Text>
                        <Text>Имя бота: {userInfo.bot?.name}</Text>
                        <Text>ID бота: {userInfo.bot?.id}</Text>
                        <Text>Имя пользователя: {userInfo.user?.first_name}</Text>
                        <Text>ID пользователя: {userInfo.user?.id}</Text>
                        <Text>Статус проверки: Успешно</Text>
                    </div>
                ) : (
                    // Если данные не получены
                    <Text weight={700} color="red">
                        Не удалось получить данные о пользователе.
                    </Text>
                )}

                {/* Отладочная информация */}
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

// "use client";
// import { useEffect, useState } from "react";
// import {Badge, Box, Button, Container, Grid, Text, Image} from "@mantine/core";
// import Link from "next/link";
//
// export default function TelegramWebApp() {
//     const [chatId, setChatId] = useState<string | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [userData, setUserData] = useState<any | null>(null);
//
//     useEffect(() => {
//         try {
//             const tg = window.Telegram.WebApp;
//             tg.ready();
//
//             const debugInfo = {
//                 user: tg.initDataUnsafe.user,
//                 theme: tg.themeParams,
//                 initData: tg.initData,
//             };
//
//             // Добавляем данные на страницу
//             const debugDiv = document.createElement("div");
//             debugDiv.style.position = "fixed";
//             debugDiv.style.bottom = "0";
//             debugDiv.style.left = "0";
//             debugDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
//             debugDiv.style.color = "white";
//             debugDiv.style.padding = "10px";
//             debugDiv.style.zIndex = "1000";
//             debugDiv.style.fontSize = "12px";
//             debugDiv.innerText = `Debug Info: ${JSON.stringify(debugInfo, null, 2)}`;
//             document.body.appendChild(debugDiv);
//
//         } catch (error) {
//             console.error("Ошибка при получении параметров из URL:", error);
//         }
//     }, []);
//
//     const phoneModels = [
//         { name: "iPhone SE", isNew: true },
//         { name: "iPhone SE", isNew: false },
//         { name: "iPhone 11", isNew: false },
//         { name: "iPhone 11 Pro Max", isNew: false },
//         { name: "iPhone 12", isNew: false },
//         { name: "iPhone 13 mini", isNew: false },
//         { name: "iPhone 13", isNew: false },
//         { name: "iPhone 13 Pro Max", isNew: true },
//         { name: "iPhone 14 Pro", isNew: false },
//         { name: "iPhone 14 Pro Max", isNew: false },
//         { name: "iPhone 15", isNew: false },
//     ];
//
//     const [active, setActive] = useState(null);
//
//     return (
//         <Container size='xs'>
//             {/* Вывод данных пользователя */}
//             {userData && (
//                 <Box>
//                     <Text size="sm" weight={500}>Привет, {userData.first_name} {userData.last_name || ""}</Text>
//                     <Text size="sm">Ваш username: @{userData.username}</Text>
//                 </Box>
//             )}
//             <Grid>
//                 <Grid.Col span={3}>
//                     <Box>
//                         <Image src="https://placehold.co/32x32" alt="" fit="contain"/>
//                         <Text style={{
//                             color: "#1B1F3BE5",
//                             fontSize: '13px',
//                         }}>Apple</Text>
//                     </Box>
//                 </Grid.Col>
//                 <Grid.Col span={3}></Grid.Col>
//                 <Grid.Col span={3}></Grid.Col>
//                 <Grid.Col span={3}></Grid.Col>
//             </Grid>
//
//             {phoneModels.map((model, index) => (
//                 <Button
//                     key={index}
//                     variant="default"
//                     fullWidth
//                     radius="md"
//                     onClick={() => setActive(index)}
//                     style={{
//                         height: "50px",
//                         padding: "0 15px",
//                         marginBottom: "10px",
//                         backgroundColor: active === index ? "#F0F9FF" : "#fff",
//                         border: active === index
//                             ? "1px solid #228BE6"
//                             : "1px solid #E0E0E0",
//                     }}
//                 >
//                     <Text
//                         size="sm"
//                         weight={500}
//                         style={{
//                             textAlign: "center",
//                             flexGrow: 1,
//                             color: active === index ? "#228BE6" : "#000",
//                         }}
//                     >
//                         {model.name}
//                     </Text>
//                 </Button>
//             ))}
//             <Text style={{
//                 color: "#1B1F3BE5",
//                 fontSize: '20px',
//                 fontWeight: '800',
//                 lineHeight: '24px',
//                 textAlign: 'center'
//             }}>Выберите устройство</Text>
//
//
//
//             <Text style={{
//                 color: "#1B1F3BE5",
//                 fontSize: '20px',
//                 fontWeight: '800',
//                 lineHeight: '24px',
//                 textAlign: 'center'
//             }}>Выберите объем памяти и цвет</Text>
//             <Text style={{
//                 color: "#1B1F3BE5",
//                 fontSize: '20px',
//                 fontWeight: '800',
//                 lineHeight: '24px',
//                 textAlign: 'center'
//             }}>Выберите спецификацию</Text>
//
//         </Container>
//     );
// }