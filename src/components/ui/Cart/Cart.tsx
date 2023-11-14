import {IconShoppingCart} from "@tabler/icons-react";
import {Box, Drawer, Card, Text, UnstyledButton} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import { IconInfoCircle } from '@tabler/icons-react';
import classes from "./cart.module.css";
import {useGetCartQuery} from "@/store/api/client/cart.api";
import _ from "lodash";

const Cart = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const {data: cart} = useGetCartQuery('');

    const totalAmountSum = _.sumBy(cart, 'totalAmount');

    return (
        <>
            <UnstyledButton onClick={open}>
                <IconShoppingCart/> {totalAmountSum}
            </UnstyledButton>

            <Drawer opened={opened} onClose={close} position="right" size="lg" title="Состав заказа">
                {cart?.length > 0 ? <>
                        {cart.map((item: any, index: number) => {
                            return (
                                <Card withBorder radius="md" mb="24px" key={index}>
                                    <Card.Section withBorder inheritPadding py="xs">
                                        <Box>
                                            <Text className={classes.cartOrderNumber}>№{item.number_id} от {item.date}</Text>
                                            <Text className={classes.cartOrderSupplier}>Поставщик: <span>{item.supplier}</span></Text>
                                            <Text className={classes.cartOrderWarehouse}>Адрес склада: <span>{item.warehouse_address}</span></Text>
                                        </Box>
                                    </Card.Section>

                                    <Card.Section inheritPadding mt="sm" pb="md">
                                        <Box className={classes.cartProducts}>
                                            {item.products.map((product: any, index: number) => {
                                                return (
                                                    <Box className={classes.cartProductItem} key={index}>
                                                        <Box className={classes.cartProduct}>
                                                            <Text className={classes.cartProductName}>{product.name}</Text>
                                                        </Box>
                                                        <Box>
                                                            <Box className={classes.cartProductPrice}>{product.price} ₽</Box>
                                                            <Box className={classes.cartProductQty}>{product.quantity} шт.</Box>
                                                        </Box>
                                                    </Box>
                                                )
                                            })}
                                        </Box>

                                        <Box className={classes.cartOrderAmount}>
                                            <Text className={classes.orderAmount}>Итого: <span>{item.totalAmount} ₽</span></Text>
                                            <Text className={classes.amountQuantity}>Товаров: {item.totalQuantity}</Text>
                                        </Box>
                                    </Card.Section>
                                </Card>
                            )

                        })}

                        <Box className={classes.cartInfo}>
                            <IconInfoCircle size={36} className={classes.cartInfoIcon}/>
                            <Text className={classes.cartInfoText}>Заказы сформированные до 14:00 (Мск +3) доставляются в день заказа, после 14:00 — на следующий день</Text>
                        </Box>
                    </>
                : <>Нет товаров в заказе</>
                }
            </Drawer>
        </>
    )
}

export default Cart;