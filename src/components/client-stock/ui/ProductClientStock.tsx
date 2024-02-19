import {ProductProps} from "@/components/client-stock/types";
import {Box, Button, Flex, NumberFormatter, NumberInput, Table, Text, Image} from "@mantine/core";
import {IconShoppingCart} from "@tabler/icons-react";
import {Controller, useForm} from "react-hook-form";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {getStock} from "@/store/slices/stockSlice";
import classes from "../client-stock.module.css";
import {useBuyProductMutation} from "@/store/api/client/cart.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {modals} from "@mantine/modals";

const ProductClientStock = ({product} : ProductProps) => {
    const {choseWarehouseClient} = useSelector(getStock);

    const [buyProduct] = useBuyProductMutation();

    const {
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            quantity: 1,
            warehouse_client_id: 0,
            stock_id: 0,
        }
    });

    useEffect(() => {
        setValue('stock_id', product.id);
        setValue('warehouse_client_id', choseWarehouseClient);
    }, [product, choseWarehouseClient]);

    const addCart = () => {
        if (choseWarehouseClient === 0) return WarehouseModal()

        buyProduct(getValues()).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    const WarehouseModal = () => modals.open({
        title: 'Вы не выбрали склад',
        children: (
            <>
                <Text size="sm">
                    Вы не выбрали склад, куда должны доставить заказ, выберите его и повторите попытку.
                </Text>
                <Button fullWidth color="#2997A3" onClick={() => modals.closeAll()} mt="md">
                    Хорошо
                </Button>
            </>
        ),
    });

    return (
        <Table.Tr className={classes.product}>
            <Table.Td>
                <Text className={classes.name}>

                    <Flex gap={8} align="start">
                        {product.country_icon && (
                            <Image src={product.country_icon} width={18} height={18} fit="contain" alt={product.name}/>
                        )}
                        <Box>
                            <Text className={classes.name}>
                                {product.name}
                            </Text>

                            <Text className={classes.article}>
                                Артикул: <span>{product.article}</span>
                            </Text>
                            {product?.period_validity && (
                                <Text className={classes.article}>
                                    Срок годности: <span>{product?.period_validity}</span>
                                </Text>
                            )}

                        </Box>
                    </Flex>
                </Text>
                <Text className={classes.article}>
                    Артикул: <span>{product.article}</span>
                </Text>
                {product?.period_validity && (
                    <Text className={classes.article}>
                        Срок годности: <span>{product?.period_validity}</span>
                    </Text>
                )}
            </Table.Td>
            <Table.Td>
                <Text>
                    {product.trading_text}
                </Text>
            </Table.Td>
            <Table.Td className={classes.quantity}>
                <Flex align="center" gap={4}>
                    <Box className={classes.badge}></Box>
                    <Text className={classes.quantityText}>{product.qty}</Text>
                </Flex>
            </Table.Td>
            <Table.Td>
                <NumberFormatter value={product.price} thousandSeparator=" " decimalSeparator="." suffix=" ₽"/>
            </Table.Td>
            <Table.Td>
                <Controller
                    name="quantity"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <NumberInput
                            value={value}
                            min={1}
                            max={product.qty}
                            onChange={(qty) => {
                                setValue('quantity', Number(qty))
                            }}
                            rightSection="шт"
                            placeholder="0"
                        />
                    )}
                />
            </Table.Td>
            <Table.Td>
                <Button color="#2997A3" onClick={addCart}>
                    <IconShoppingCart/>
                </Button>
            </Table.Td>
        </Table.Tr>
    )
}

export default ProductClientStock;