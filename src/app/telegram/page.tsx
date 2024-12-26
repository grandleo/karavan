"use client";
import { useEffect, useState } from "react";
import {Container, Text, Loader, Stack, Button, NumberInput, Flex} from "@mantine/core";
import Script from "next/script";
import axios from "axios";
import { setCookie, getCookie, removeCookie } from "@/utils/cookieUtil";
import Link from "next/link";
import {setToken} from "@/features/auth/utils/tokenUtil";
import {getBotId, setBotId} from "@/utils/botUtil";
import {useCreateOrderMutation} from "@/features/orders/api/ordersApi";
import {notify} from "@/utils/notify";
import {IconGavel, IconHome, IconShoppingCartFilled, IconUser} from "@tabler/icons-react";
import TelegramCategorySelector from "@/features/categories/components/TelegramCategorySelector";
import TelegramProductDrawer from "@/features/products/components/TelegramProductDrawer";
import {useDisclosure} from "@mantine/hooks";
import {useLazyFetchClientProductsQuery} from "@/features/products/api/productsApi";

export default function TelegramWebApp() {
    const [debugInfo, setDebugInfo] = useState<string>(""); // Для отладки
    const [userInfo, setUserInfo] = useState<any>(null); // Информация о пользователе
    const [loading, setLoading] = useState<boolean>(true); // Индикатор загрузки
    const [error, setError] = useState<string | null>(null); // Сообщения об ошибках
    const [products, setProducts] = useState<any[]>([]); // Список товаров
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // Выбранный товар

    const [opened, { open, close }] = useDisclosure(false);
    const [triggerFetchProducts, { data: fetchedProducts, isLoading: isProductsLoading, isError: isProductsError, error: productsError }] =
        useLazyFetchClientProductsQuery();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const tg = window.Telegram?.WebApp;

        if (!tg) {
            setError("Telegram WebApp не доступен");
            setLoading(false);
            return;
        }

        tg.ready();

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
                const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/webapp/verify`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token_hash: tokenHash,
                        chat_id: chatId,
                        user_data: userData,
                    }),
                });

                const data = await response.json();
                setLoading(false);

                if (data.error) {
                    console.error("Ошибка проверки:", data.error);
                    setError(data.error);
                } else {
                    const { access_token, expires_in, user, bot_id } = data;

                    // Сохраняем токен и данные пользователя
                    await setToken(access_token, expires_in);
                    await setBotId(bot_id, expires_in);
                    setCookie("user_data", JSON.stringify(user), expires_in);

                    setUserInfo(user);
                }
            } catch (error) {
                setLoading(false);
                console.error("Ошибка запроса:", error.message);
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const handleSelectCategory = async (category: any) => {
        if (category.children_count === 0) {
            const bot_id = await getBotId();
            triggerFetchProducts(category.id);
        }
    };

    useEffect(() => {
        if (fetchedProducts && !isProductsError) {
            setProducts(fetchedProducts);
        }
    }, [fetchedProducts, isProductsError]);

    const handleSelectProduct = (product: any) => {
        setSelectedProduct(product.id); // Сохраняем ID товара
        open(); // Открыть Drawer
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
                    Karavan.bz
                </Text>

                {loading && <Loader />}

                {/* Компонент для выбора категорий */}
                <TelegramCategorySelector onSelectCategory={handleSelectCategory} />

                {/* Рендеринг товаров */}
                {isProductsLoading ? (
                    <Loader />
                ) : isProductsError ? (
                    <Text weight={700} color="red">
                        Ошибка загрузки товаров: {productsError?.data?.message || "Неизвестная ошибка"}
                    </Text>
                ) : products.length > 0 && (
                    <div style={{ marginTop: "2rem" }}>
                        <Text weight={700} size="md" style={{ marginBottom: "0.5rem" }}>
                            Товары:
                        </Text>
                        <Stack spacing="sm">
                            {products.map((product) => (
                                <Button key={product.id} onClick={() => handleSelectProduct(product)} variant="default">
                                    {product.name}
                                </Button>
                            ))}
                        </Stack>
                    </div>
                )}

                <Flex
                    align="center"
                    justify="space-around"
                    style={{
                        backgroundColor: "white",
                        padding: "24px 10px",
                        marginTop: "24px",
                    }}
                >
                    <Link href="/telegram">
                        <IconHome stroke={2} size={24} color="#1B1F3BE5" />
                    </Link>
                    <Link href="/telegram/orders">
                        <IconShoppingCartFilled size={24} color="#1B1F3BE5" />
                    </Link>
                    <Link href="#">
                        <IconGavel stroke={2} size={24} color="#1B1F3BE5" />
                    </Link>
                    <Link href="#">
                        <IconUser stroke={2} size={24} color="#1B1F3BE5" />
                    </Link>
                </Flex>

                <TelegramProductDrawer opened={opened} close={close} productId={selectedProduct} />
            </Container>
        </>
    );
}