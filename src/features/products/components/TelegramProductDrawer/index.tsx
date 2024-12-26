import {Drawer, Text, NumberInput, Button, Loader} from "@mantine/core";
import {useEffect, useState} from "react";
import { notify } from "@/utils/notify";
import { useCreateOrderMutation } from "@/features/orders/api/ordersApi";
import {useLazyFetchClientProductDetailsQuery} from "@/features/products/api/productsApi";

interface TelegramProductDrawerProps {
    opened: boolean;
    close: () => void;
    productId: number | null;
}

export default function TelegramProductDrawer({
                                                  opened,
                                                  close,
                                                  productId,
                                              }: TelegramProductDrawerProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const [createOrder] = useCreateOrderMutation();

    const [triggerFetchProduct, { data: product, isLoading, isError, error }] = useLazyFetchClientProductDetailsQuery();

    useEffect(() => {
        if (opened && productId) {
            triggerFetchProduct(productId);
        }
    }, [opened, productId]);

    const handleOrder = async () => {
        if (!product) return;

        try {
            const result = await createOrder({
                supplier_id: product.supplier_id,
                quantity,
            }).unwrap();
            notify(result.message);
            setQuantity(1); // Сбросить количество
            close(); // Закрыть Drawer
        } catch (err: any) {
            console.error("Ошибка создания заказа:", err);
            notify(err.message, "error");
        }
    };

    if (isError) {
        notify(error?.data?.message || "Ошибка загрузки данных", "error");
    }

    return (
        <Drawer
            opened={opened}
            onClose={close}
            position="bottom"
            size="75%"
            title="Детали товара"
            padding="lg"
        >
            {isLoading ? (
                <Loader />
            ) : product ? (
                <>
                    <Text weight={700} size="lg">
                        {product.name}
                    </Text>
                    <Text>Цена: {product.price}</Text>
                    <Text>Остаток: {product.qty}</Text>
                    <NumberInput
                        value={quantity}
                        onChange={(value) => setQuantity(value || 0)}
                        min={1}
                        label="Количество"
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                    />
                    <Button fullWidth onClick={handleOrder}>
                        Заказать
                    </Button>
                </>
            ) : (
                <Text>Данные о товаре отсутствуют</Text>
            )}
        </Drawer>
    );
}