'use client'

import {Badge, Box, Button, Card, Divider, Group, List, NavLink, NumberInput, Paper, Table, Text} from "@mantine/core";
import classes from "./client-stock.module.css";
import {useGetStockCategoriesQuery, useGetStockProductsQuery} from "@/store/api/client/stockClient.api";
import {useActions} from "@/hooks/useActions";
import {useSelector} from "react-redux";
import {getStockClient} from "@/store/slices/stockClientSlice";
import {useEffect, useState} from "react";
import PageHeader from "@/components/simplePage/pageHeader";
import PageContent from "@/components/simplePage/pageContent";
import PageWrapper from "@/components/simplePage/pageWrapper";
import EmptyProductsForClient from "@/components/ui/EmptyData/EmptyProductsForClient";
import ButtonMinimal from "@/components/ui/Buttons/ButtonMinimal";
import { IconShoppingCart } from '@tabler/icons-react';
import Cart from "@/components/ui/Cart/Cart";
import {useBuyProductMutation} from "@/store/api/client/cart.api";
import {useForm} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";

export default function Page({ params }: { params: { id: number } }) {
    const {activeCategory, order} = useSelector(getStockClient)
    const {data: categories} = useGetStockCategoriesQuery('');

    const {data: products} = useGetStockProductsQuery(activeCategory);

    return (
        <>
            <PageWrapper>
                <PageHeader title="Каталог"><Cart/></PageHeader>
                <PageContent>
                    <>
                        {categories?.length === 0 ? <EmptyProductsForClient/> :
                        <Box className={classes.catalog}>
                            <Box className={classes.sectionBlock}>
                                {categories?.map((category: any, index: number) => {
                                    return (
                                        <CategoryItem key={index} category={category}/>
                                    )
                                })}
                            </Box>
                            {products?.length === 0 ? <Box>Выберите категорию</Box> : <Products products={products} warehouse_id={params.id}/>}
                        </Box>}
                    </>
                </PageContent>
            </PageWrapper>
        </>
    )
}

const Products = ({products, warehouse_id}: any) => {
    return (
        <>
        <Paper shadow="xs" radius="md" className={classes.productsTable}>
            <Table highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Наименование</Table.Th>
                        <Table.Th w={380}>Характестики</Table.Th>
                        <Table.Th w={120}>В наличии</Table.Th>
                        <Table.Th w={150}>Цена</Table.Th>
                        <Table.Th w={150}>Кол-во</Table.Th>
                        <Table.Th w={75}></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {products?.map((product: any, index: number) => {
                        return (
                            <Product item={product} key={index} warehouse_id={warehouse_id}/>
                        )
                    })}
                </Table.Tbody>
            </Table>
        </Paper>
        </>
    )
}

const Product = ({item, warehouse_id}: any) => {
    const [quantity, setQuantity] = useState<string | number>(1)
    // const {addProductToOrder} = useActions();

    const [buyProduct] = useBuyProductMutation();

    const {
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            quantity: quantity,
            warehouse_client_id: warehouse_id,
            stock_id: item.id,
        }
    });

    useEffect(() => {
        setValue('quantity', quantity);
    }, [quantity]);

    // const addProduct = () => {
    //     const productToCart = {
    //         id: item.id,
    //         name: item.name,
    //         price: item.price,
    //         qty: value
    //     }
    //
    //     addProductToOrder(productToCart)
    // }

    const addCart = () => {
        buyProduct(getValues()).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }


    return (
        <>
            <Table.Tr>
                <Table.Td>
                    <Text className={classes.productName}>{item.name}</Text>
                    <Text className={classes.productChar}>Годен до: <Text span>01.09.2025</Text></Text>
                    <Text className={classes.productChar}>Артикул: <Text span>207368</Text></Text>
                </Table.Td>
                <Table.Td>
                    <Text className={classes.productChar}>
                        {/*Действующее вещество: <Text span>Парацетамол, Фенилэфрин, Фенирамин, Аскорбиновая кислота</Text>*/}
                    </Text>
                </Table.Td>
                <Table.Td>
                    <Text>{item.qty}</Text>
                </Table.Td>
                <Table.Td>
                    <Text>{item.price}</Text>
                </Table.Td>
                <Table.Td>
                    <NumberInput
                        rightSection="шт"
                        value={quantity} onChange={setQuantity} min={1} max={item.qty}
                    />
                </Table.Td>
                <Table.Td>
                    <ButtonMinimal onclick={addCart}>
                        <IconShoppingCart/>
                    </ButtonMinimal>
                </Table.Td>
            </Table.Tr>
        </>
    )
}

const CategoryItem = ({category}: any) => {
    const {setActiveCategoryStock} = useActions();

    return (
        <>
            {category?.subcategories.length > 0 ? (
                <NavLink
                    label={category.name}
                    childrenOffset={28}
                >
                    {category?.subcategories.map((subcategory: any, index: number) => {
                        return (
                            <CategoryItem category={subcategory} key={index}/>
                        )
                    })}
                </NavLink>
            ) : (
                <NavLink label={category.name} onClick={() => setActiveCategoryStock(category.id)}/>
            )}
        </>
    )
}

const ProductItem = ({product}: any) => {
    const [value, setValue] = useState<string | number>(1)
    const {addProductToOrder} = useActions();

    const addProduct = () => {
        const productToCart = {
            id: product.id,
            name: product.name,
            price: product.price,
            qty: value
        }

        addProductToOrder(productToCart)
    }

    return (
        <>
            <Card withBorder shadow="sm" mb={15} radius="md">
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                        <Text fw={500}>{product.name}</Text>
                    </Group>
                </Card.Section>

                <Text mt="sm" c="dimmed" size="sm">
                    Артикул: {product.article}
                </Text>
                <Text mt="sm" c="dimmed" size="sm">
                    {product.description}
                </Text>
                <Text mt="sm" c="dimmed" size="sm">
                    В наличии: {product.qty}
                </Text>
                <Text mt="sm" c="dimmed" size="sm">
                    Цена: {product.price}
                </Text>

                <NumberInput value={value} onChange={setValue} min={1} max={product.qty}/>

                <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={addProduct}>
                    Выбрать
                </Button>
            </Card>
        </>
    )
}