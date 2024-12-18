"use client";

import {Container, Title, Card, Text, Grid, Group, Progress, SimpleGrid, Stack, Flex, Box} from '@mantine/core';
import {
    IconShoppingCart,
    IconClock,
    IconCheck,
    IconHome,
    IconGavel,
    IconUser,
    IconShoppingCartFilled
} from '@tabler/icons-react';
import Link from "next/link";

export default function OrdersPage() {
    return (
        <Container size="xs">
            <Flex direction="column" style={{height:'100vh'}}>
            {/* Шапка */}
            <Title order={3} style={{marginBottom: '20px', fontWeight: '600'}}>
                Мои заказы
            </Title>

            <Box style={{flexGrow: 1}}>




                {/* Статистика */}
                <Card shadow="xs" padding="lg" style={{marginBottom: '20px', borderRadius: '12px'}}>
                    <Grid>
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed">
                                Общее кол-во
                            </Text>
                            <Text weight={700} size="lg">
                                80 шт
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6} style={{textAlign: 'right'}}>
                            <Text size="xs" color="dimmed">
                                Общая стоимость
                            </Text>
                            <Text weight={700} size="lg">
                                $1500
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Card>

                {/* Заказы */}
                <Stack spacing="md">
                    {/* 1. Комплектуется */}
                    <Card shadow="xs" padding="md" style={{borderRadius: '12px'}}>
                        <Text weight={600} size="sm" style={{marginBottom: '10px'}}>
                            Комплектуется
                        </Text>
                        <Progress value={30} size="sm" radius="xl" color="green"/>
                        <Group position="apart" style={{marginTop: '10px'}}>
                            <Group spacing="xs">
                                <IconShoppingCart size={18} color="green"/>
                                <Text size="sm">60 шт</Text>
                            </Group>
                            <Text size="sm" color="dimmed">
                                03.06.23
                            </Text>
                            <Text size="sm">$1250</Text>
                        </Group>
                    </Card>

                    {/* 2. В ожидании выдачи */}
                    <Card shadow="xs" padding="md" style={{borderRadius: '12px'}}>
                        <Text weight={600} size="sm" style={{marginBottom: '10px'}}>
                            В ожидании выдачи
                        </Text>
                        <Progress value={60} size="sm" radius="xl" color="green"/>
                        <Group position="apart" style={{marginTop: '10px'}}>
                            <Group spacing="xs">
                                <IconClock size={18} color="green"/>
                                <Text size="sm">20 шт</Text>
                            </Group>
                            <Text size="sm" color="dimmed">
                                03.06.23
                            </Text>
                            <Text size="sm">$850</Text>
                        </Group>
                    </Card>

                    {/* 3. Выдан */}
                    <Card shadow="xs" padding="md" style={{borderRadius: '12px'}}>
                        <Text weight={600} size="sm" style={{marginBottom: '10px'}}>
                            Выдан
                        </Text>
                        <Progress value={100} size="sm" radius="xl" color="green"/>
                        <Group position="apart" style={{marginTop: '10px'}}>
                            <Group spacing="xs">
                                <IconCheck size={18} color="green"/>
                                <Text size="sm">99 шт</Text>
                            </Group>
                            <Text size="sm" color="dimmed">
                                03.06.23
                            </Text>
                            <Text size="sm">$2250</Text>
                        </Group>
                    </Card>
                </Stack>
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