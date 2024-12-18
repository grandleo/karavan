"use client";
import { useEffect, useState } from "react";
import { Container, Text } from "@mantine/core";

export default function TelegramWebAppDebug() {
    const [debugInfo, setDebugInfo] = useState<string>("");

    useEffect(() => {
        try {
            const tg = window.Telegram.WebApp;

            tg.ready(); // Сообщаем Telegram, что WebApp готов

            // Собираем отладочные данные
            const data = {
                initData: tg.initData,
                user: tg.initDataUnsafe?.user || null,
                theme: tg.themeParams,
            };

            console.log("Отладочная информация:", data);

            // Устанавливаем данные в состояние для отображения на странице
            setDebugInfo(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Ошибка при получении данных Telegram WebApp:", error);
            setDebugInfo(`Error: ${error.message}`);
        }
    }, []);

    return (
        <Container>
            <Text weight={500} size="lg" style={{ marginBottom: "1rem" }}>
                Telegram WebApp Debug Info
            </Text>
            <pre
                style={{
                    background: "#f4f4f4",
                    padding: "1rem",
                    borderRadius: "8px",
                    overflowX: "auto",
                }}
            >
                {debugInfo}
            </pre>
        </Container>
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