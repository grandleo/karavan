"use client";

import { Container, Text, Stack, Button, Flex } from "@mantine/core";
import { IconGavel, IconHome, IconShoppingCartFilled, IconUser } from "@tabler/icons-react";
import TelegramCategorySelector from "@/features/categories/components/TelegramCategorySelector";
import TelegramProductDrawer from "@/features/products/components/TelegramProductDrawer";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useLazyFetchClientProductsQuery } from "@/features/products/api/productsApi";
import Link from "next/link";

export default function TelegramWebAppPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    const [opened, { open, close }] = useDisclosure(false);
    const [triggerFetchProducts, { data: fetchedProducts, isLoading: isProductsLoading, isError: isProductsError }] =
        useLazyFetchClientProductsQuery();

    const handleSelectCategory = async (category: any) => {
        if (category.children_count === 0) {
            triggerFetchProducts(category.id);
        }
    };

    const handleSelectProduct = (product: any) => {
        setSelectedProduct(product.id);
        open();
    };

    return (
        <Container>
            <Text weight={500} size="lg" style={{ marginBottom: "1rem" }}>
                Karavan.bz
            </Text>

            {/* Компонент для выбора категорий */}
            <TelegramCategorySelector onSelectCategory={handleSelectCategory} />

            {/* Список товаров */}
            {isProductsLoading ? (
                <Text>Загрузка товаров...</Text>
            ) : isProductsError ? (
                <Text weight={700} color="red">
                    Ошибка загрузки товаров
                </Text>
            ) : products.length > 0 && (
                <Stack spacing="sm" style={{ marginTop: "2rem" }}>
                    {products.map((product) => (
                        <Button key={product.id} onClick={() => handleSelectProduct(product)}>
                            {product.name}
                        </Button>
                    ))}
                </Stack>
            )}

            {/* Нижняя навигация */}
            <Flex
                align="center"
                justify="space-around"
                style={{
                    backgroundColor: 'white',
                    padding: '24px 10px',
                }}
            >
                <Link href="/telegram">
                    <IconHome stroke={2} size={24} color="#1B1F3BE5"/>
                </Link>
                <Link href="/telegram/orders">
                    <IconShoppingCartFilled size={24} color="#1B1F3BE5"/>
                </Link>
                <Link href="#">
                    <IconGavel stroke={2} size={24} color="#1B1F3BE5"/>
                </Link>
                <Link href="#">
                    <IconUser stroke={2} size={24} color="#1B1F3BE5"/>
                </Link>
            </Flex>

            {/* Drawer для продукта */}
            <TelegramProductDrawer opened={opened} close={close} productId={selectedProduct} />
        </Container>
    );
}