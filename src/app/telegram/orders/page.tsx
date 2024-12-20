"use client";

import {
    Container,
    Title,
    Card,
    Text,
    Progress,
    Flex,
    Box,
    NumberFormatter
} from '@mantine/core';
import {
    IconHome,
    IconGavel,
    IconUser,
    IconShoppingCartFilled
} from '@tabler/icons-react';
import Link from "next/link";
import {useFetchClientOrderNumbersQuery} from "@/features/orders/api/ordersApi";

export default function OrdersPage() {
    const { data: orders, isLoading, isFetching, error } = useFetchClientOrderNumbersQuery('', {
        refetchOnMountOrArgChange: true,
    });

    return (
        <Container size="xs">
            <Flex direction="column" style={{height:'100vh'}}>
            {/* Шапка */}
            <Title order={3} style={{marginBottom: '20px', fontWeight: '600'}}>
                Мои заказы
            </Title>

            <Box style={{flexGrow: 1}}>




                {/* Статистика */}
                {/*<Card shadow="xs" padding="lg" style={{marginBottom: '20px', borderRadius: '12px'}}>*/}
                {/*    <Grid>*/}
                {/*        <Grid.Col span={6}>*/}
                {/*            <Text size="xs" color="dimmed">*/}
                {/*                Общее кол-во*/}
                {/*            </Text>*/}
                {/*            <Text weight={700} size="lg">*/}
                {/*                80 шт*/}
                {/*            </Text>*/}
                {/*        </Grid.Col>*/}
                {/*        <Grid.Col span={6} style={{textAlign: 'right'}}>*/}
                {/*            <Text size="xs" color="dimmed">*/}
                {/*                Общая стоимость*/}
                {/*            </Text>*/}
                {/*            <Text weight={700} size="lg">*/}
                {/*                $1500*/}
                {/*            </Text>*/}
                {/*        </Grid.Col>*/}
                {/*    </Grid>*/}
                {/*</Card>*/}

                <Box style={{ flexGrow: 1 }}>
                    {/* Блок отладки */}
                    <Box style={{ marginBottom: '20px', background: '#f4f4f4', padding: '10px', borderRadius: '8px' }}>
                        <Text weight={700} size="sm" style={{ marginBottom: '10px' }}>
                            Отладка данных:
                        </Text>
                        <Text size="xs" color="dimmed">
                            {isLoading ? "Загрузка данных..." : null}
                            {error ? `Ошибка: ${error.message}` : null}
                        </Text>
                        <pre style={{ fontSize: '12px', overflowX: 'auto' }}>
                            {JSON.stringify({ orders, isLoading, isFetching, error }, null, 2)}
                        </pre>
                    </Box>


                    {isLoading ? (
                        <Text>Загрузка...</Text> // Отображается пока данные загружаются
                    ) : orders && Array.isArray(orders) && orders.length > 0 ? (
                        orders.map((order) => (
                            <Card radius="md" mb={8} key={order.id}>
                                <Text
                                    style={{
                                        color: '#1B1F3BE5',
                                        fontSize: '19px',
                                        lineHeight: '24px',
                                        marginBottom: '28px',
                                        textAlign: 'center'
                                    }}>Заказ #{order.id}</Text>
                                <Text
                                    style={{
                                        color: '#1B1F3BE5',
                                        fontSize: '19px',
                                        lineHeight: '24px',
                                        marginBottom: '28px',
                                        textAlign: 'center'
                                    }}
                                >{order.status}</Text>
                                <Progress value={30} size="sm" radius="xl" color="green" style={{ marginBottom: '16px' }}/>
                                <Flex
                                    justify="space-evenly"
                                    align="center"
                                >
                                    <Text
                                        style={{
                                            color: '#1B1F3B73',
                                            fontSize: '15px',
                                            lineHeight: '24px',
                                        }}
                                    >{order.total_qty} шт</Text>
                                    <Text
                                        style={{
                                            color: '#1B1F3B73',
                                            fontSize: '15px',
                                            lineHeight: '24px',
                                        }}>{order.date}</Text>

                                    <NumberFormatter
                                        value={order.total}
                                        prefix={order.currency?.prefix || ''}
                                        suffix={order.currency?.suffix || ''}
                                        style={{
                                            color: '#1B1F3B73',
                                            fontSize: '15px',
                                            lineHeight: '24px',
                                        }}
                                    />
                                </Flex>
                            </Card>
                        ))
                    ) : (
                        <Text>Нет заказов</Text> // Отображается, если данные загружены, но заказов нет
                    )}
                </Box>
            </Box>

            <Flex
                align="center"
                justify="space-around"
                style={{
                    backgroundColor: 'white',
                    padding: '24px 10px',
                }}
            >
                <Link href="#">
                    <IconHome stroke={2} size={24} color="#1B1F3BE5"/>
                </Link>
                <Link href="#">
                    <IconShoppingCartFilled size={24} color="#1B1F3BE5"/>
                </Link>
                <Link href="#">
                    <IconGavel stroke={2} size={24} color="#1B1F3BE5"/>
                </Link>
                <Link href="#">
                    <IconUser stroke={2} size={24} color="#1B1F3BE5"/>
                </Link>
            </Flex>


            </Flex>
        </Container>
    );
}