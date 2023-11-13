'use client'

import {Badge, Box, Button, Card, Divider, Group, List, NavLink, NumberInput, Paper, Table, Text} from "@mantine/core";
import classes from "./client-stock.module.css";
import {useGetStockCategoriesQuery, useGetStockProductsQuery} from "@/store/api/client/stockClient.api";
import {useActions} from "@/hooks/useActions";
import {useSelector} from "react-redux";
import {getStock} from "@/store/slices/stockClientSlice";
import {useState} from "react";
import PageHeader from "@/components/ui/page/pageHeader";
import PageContent from "@/components/ui/page/pageContent";
import PageWrapper from "@/components/ui/page/pageWrapper";
import EmptyProductsForClient from "@/components/ui/EmptyData/EmptyProductsForClient";
import ButtonMinimal from "@/components/ui/Buttons/ButtonMinimal";
import { IconShoppingCart } from '@tabler/icons-react';

export default function Page({ params }: { params: { id: number } }) {
    const {activeCategory, order} = useSelector(getStock)
    const {data: categories} = useGetStockCategoriesQuery('');

    const totalQty = order.products.reduce((total, product) => total + product.qty, 0);
    const totalPrice = order.products.reduce((total, product) => total + (product.price * product.qty), 0);

    const {data: products} = useGetStockProductsQuery(activeCategory);

    console.log(products)

    return (
        <>
            <PageWrapper>
                <PageHeader title="Каталог"/>
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
                            {products?.length === 0 ? <Box>Выберите категорию</Box> : <Products products={products}/>}
                        </Box>}
                    </>
                </PageContent>
            </PageWrapper>


            {/*<Box className={classes.wrapperPage}>*/}
            {/*    <Box className={classes.wrapperPage}>*/}
            {/*        <Box className={classes.sectionBlock}>*/}
            {/*            {categories?.map((category: any, index: number) => {*/}
            {/*                return (*/}
            {/*                    <CategoryItem key={index} category={category}/>*/}
            {/*                )*/}
            {/*            })}*/}
            {/*        </Box>*/}
            {/*        <Box className={classes.sectionBlock}>*/}
            {/*            <Text mb={15}>Выберите номенклатуру</Text>*/}

            {/*            {products?.map((product: any, index: number) => {*/}
            {/*                return (*/}
            {/*                    <ProductItem key={index} product={product}/>*/}
            {/*                )*/}
            {/*            })}*/}
            {/*        </Box>*/}
            {/*        <Box className={classes.sectionBlock}>*/}

            {/*        </Box>*/}
            {/*    </Box>*/}
            {/*    <Box>*/}
            {/*        {order.products?.length > 0 ? (*/}
            {/*            <Paper shadow="xs" radius="xs" p="xl">*/}
            {/*                <Text>Состав заказа</Text>*/}

            {/*                {order?.products?.map((item: any, index: number) => {*/}
            {/*                    return (*/}
            {/*                        <Card withBorder shadow="sm" mb={15} radius="md" key={index}>*/}
            {/*                            <Card.Section withBorder inheritPadding py="xs">*/}
            {/*                                <Group justify="space-between">*/}
            {/*                                    <Text fw={500}>{item.name}</Text>*/}
            {/*                                    <Text c="dimmed" size="sm">*/}
            {/*                                        Кол-во: {item.qty}*/}
            {/*                                    </Text>*/}
            {/*                                    <Text c="dimmed" size="sm">*/}
            {/*                                        Цена: {item.price}*/}
            {/*                                    </Text>*/}
            {/*                                </Group>*/}
            {/*                            </Card.Section>*/}
            {/*                        </Card>*/}
            {/*                    )*/}
            {/*                })}*/}

            {/*                <Divider my="sm" />*/}

            {/*                <Text>Общее кол-во товаров: {totalQty}</Text>*/}
            {/*                <Text>Общая стоимость заказа: {totalPrice}</Text>*/}
            {/*            </Paper>*/}
            {/*        ) : null}*/}
            {/*    </Box>*/}
            {/*</Box>*/}

        </>
    )
}

const Products = ({products}: any) => {
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
                            <Product item={product} key={index}/>
                        )
                    })}
                </Table.Tbody>
            </Table>
        </Paper>
        </>
    )
}

const Product = ({item}: any) => {
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
                        placeholder="0"
                    />
                </Table.Td>
                <Table.Td>
                    <ButtonMinimal>
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