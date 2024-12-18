"use client";
import { useEffect, useState } from "react";
import {Badge, Box, Button, Container, Grid, Text, Image} from "@mantine/core";
import Link from "next/link";

export default function TelegramWebApp() {
    const [chatId, setChatId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<any | null>(null);

    useEffect(() => {
        try {
            // Получение параметров из URL
            console.log("window.location.search:", window.location.search);
            const searchParams = new URLSearchParams(window.location.search);

            const chat_id = searchParams.get("chat_id");
            const bot_token = searchParams.get("token");

            console.log("Полученные параметры:", { chat_id, bot_token });

            if (chat_id) setChatId(chat_id);
            if (bot_token) setToken(bot_token);

            // Получение данных из WebApp API
            const tg = window.Telegram.WebApp;
            if (tg.initDataUnsafe) {
                console.log("Данные пользователя:", tg.initDataUnsafe.user);
                setUserData(tg.initDataUnsafe.user);
            }

            // Инициализация WebApp
            tg.ready();

        } catch (error) {
            console.error("Ошибка при получении параметров из URL:", error);
        }
    }, []);

    const phoneModels = [
        { name: "iPhone SE", isNew: true },
        { name: "iPhone SE", isNew: false },
        { name: "iPhone 11", isNew: false },
        { name: "iPhone 11 Pro Max", isNew: false },
        { name: "iPhone 12", isNew: false },
        { name: "iPhone 13 mini", isNew: false },
        { name: "iPhone 13", isNew: false },
        { name: "iPhone 13 Pro Max", isNew: true },
        { name: "iPhone 14 Pro", isNew: false },
        { name: "iPhone 14 Pro Max", isNew: false },
        { name: "iPhone 15", isNew: false },
    ];

    const [active, setActive] = useState(null);

    return (
        <Container size='xs'>
            {/* Вывод данных пользователя */}
            {userData && (
                <Box>
                    <Text size="sm" weight={500}>Привет, {userData.first_name} {userData.last_name || ""}</Text>
                    <Text size="sm">Ваш username: @{userData.username}</Text>
                </Box>
            )}
            <Grid>
                <Grid.Col span={3}>
                    <Box>
                        <Image src="https://placehold.co/32x32" alt="" fit="contain"/>
                        <Text style={{
                            color: "#1B1F3BE5",
                            fontSize: '13px',
                        }}>Apple</Text>
                    </Box>
                </Grid.Col>
                <Grid.Col span={3}></Grid.Col>
                <Grid.Col span={3}></Grid.Col>
                <Grid.Col span={3}></Grid.Col>
            </Grid>

            {phoneModels.map((model, index) => (
                <Button
                    key={index}
                    variant="default"
                    fullWidth
                    radius="md"
                    onClick={() => setActive(index)}
                    style={{
                        height: "50px",
                        padding: "0 15px",
                        marginBottom: "10px",
                        backgroundColor: active === index ? "#F0F9FF" : "#fff",
                        border: active === index
                            ? "1px solid #228BE6"
                            : "1px solid #E0E0E0",
                    }}
                >
                    <Text
                        size="sm"
                        weight={500}
                        style={{
                            textAlign: "center",
                            flexGrow: 1,
                            color: active === index ? "#228BE6" : "#000",
                        }}
                    >
                        {model.name}
                    </Text>
                </Button>
            ))}
            <Text style={{
                color: "#1B1F3BE5",
                fontSize: '20px',
                fontWeight: '800',
                lineHeight: '24px',
                textAlign: 'center'
            }}>Выберите устройство</Text>



            <Text style={{
                color: "#1B1F3BE5",
                fontSize: '20px',
                fontWeight: '800',
                lineHeight: '24px',
                textAlign: 'center'
            }}>Выберите объем памяти и цвет</Text>
            <Text style={{
                color: "#1B1F3BE5",
                fontSize: '20px',
                fontWeight: '800',
                lineHeight: '24px',
                textAlign: 'center'
            }}>Выберите спецификацию</Text>

        </Container>
    );
}