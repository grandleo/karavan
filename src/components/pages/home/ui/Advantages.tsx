import NextImage from "next/image";
import {Container, Grid, SegmentedControl, Text, Image, Flex, Box} from "@mantine/core";
import classes from "@/components/pages/home/home-page.module.css";
import {useState} from "react";

const Advantages = () => {
    const [type, setType] = useState('clients');

    return (
        <Container className={classes.advantages}>
            <Text className={classes.sectionTitle} mb={20}>
                Почему стоит выбрать Karavan ?
            </Text>
            <Text className={classes.sectionSubTitle} mb={20}>
                Беспроигрышный подход позволил нам создать преимущества для всех!
            </Text>

            <Box ta="center">
                <SegmentedControl
                    value={type}
                    onChange={setType}
                    data={[
                        { label: 'Для клиентов', value: 'clients' },
                        { label: 'Для поставщиков', value: 'suppliers' },
                        { label: 'Для логистов', value: 'logistics' }
                    ]}
                    m="20 auto 20"
                />
            </Box>
            {
                (() => {
                    switch (type) {
                        case 'clients':
                            return <Clients />;
                        case 'suppliers':
                            return <Suppliers />;
                        case 'logistics':
                            return <Logistics />;
                        default:
                            return <Clients />;
                    }
                })()
            }
        </Container>
    )
}

const Clients = () => {
    return (
        <Grid align="center">
            <Grid.Col span={5} offset={1}>
                <Image component={NextImage} src="./images/homepage/advantage_1_1.svg" width={397} height={488} fit="contain" alt="Лучшая цена на рынке"/>
            </Grid.Col>
            <Grid.Col span={5} className={classes.advantage}>
                <Flex gap={5}>
                    <Box className={classes.number}>1</Box>
                    <Box className={classes.benefit}>Цена</Box>
                </Flex>
                <Text className={classes.title}>Лучшая цена на рынке</Text>
                <Text className={classes.subTitle}>Платформа проводит для вас тендер среди всех наших поставщиков, поэтому клиенты Karavan автоматически получают самую низкую цену на каждый продукт.</Text>
            </Grid.Col>
            <Grid.Col span={5} offset={1} className={classes.advantage}>
                <Flex gap={5}>
                    <Box className={classes.number}>2</Box>
                    <Box className={classes.benefit}>Скорость</Box>
                </Flex>
                <Text className={classes.title}>С нами вы будете работать быстрее, чем ваши конкуренты.</Text>
                <Text className={classes.subTitle}>Автоматическое оформление заказа в 3 клика, и мы готовы выдать вам весь ваш заказ в течение 3 часов после оплаты.</Text>
            </Grid.Col>
            <Grid.Col span={5}>
                <Image component={NextImage} src="./images/homepage/advantage_1_2.svg" width={397} height={488} fit="contain" alt="Лучшая цена на рынке"/>
            </Grid.Col>
        </Grid>
    )
}

const Suppliers = () => {
    return (
        <Grid align="center">
            <Grid.Col span={5} className={classes.advantage}>
                <Flex gap={5}>
                    <Box className={classes.number}>1</Box>
                    <Box className={classes.benefit}>Цена</Box>
                </Flex>
                <Text className={classes.title}>Лучшая цена на рынке</Text>
                <Text className={classes.subTitle}>Платформа проводит для вас тендер среди всех наших поставщиков, поэтому клиенты Karavan автоматически получают самую низкую цену на каждый продукт.</Text>
            </Grid.Col>
            <Grid.Col span={5} offset={1}>
                <Image component={NextImage} src="./images/homepage/advantage_1_1.svg" width={397} height={488} fit="contain" alt="Лучшая цена на рынке"/>
            </Grid.Col>
            <Grid.Col span={5}>
                <Image component={NextImage} src="./images/homepage/advantage_1_2.svg" width={397} height={488} fit="contain" alt="Лучшая цена на рынке"/>
            </Grid.Col>
            <Grid.Col span={5} offset={1} className={classes.advantage}>
                <Flex gap={5}>
                    <Box className={classes.number}>2</Box>
                    <Box className={classes.benefit}>Скорость</Box>
                </Flex>
                <Text className={classes.title}>С нами вы будете работать быстрее, чем ваши конкуренты.</Text>
                <Text className={classes.subTitle}>Автоматическое оформление заказа в 3 клика, и мы готовы выдать вам весь ваш заказ в течение 3 часов после оплаты.</Text>
            </Grid.Col>
        </Grid>
    )
}

const Logistics = () => {
    return (
        <Grid align="center">
            <Grid.Col span={5} offset={1}>
                <Image component={NextImage} src="./images/homepage/advantage_1_1.svg" width={397} height={488} fit="contain" alt="Лучшая цена на рынке"/>
            </Grid.Col>
            <Grid.Col span={5} className={classes.advantage}>
                <Flex gap={5}>
                    <Box className={classes.number}>1</Box>
                    <Box className={classes.benefit}>Цена</Box>
                </Flex>
                <Text className={classes.title}>Лучшая цена на рынке</Text>
                <Text className={classes.subTitle}>Платформа проводит для вас тендер среди всех наших поставщиков, поэтому клиенты Karavan автоматически получают самую низкую цену на каждый продукт.</Text>
            </Grid.Col>
            <Grid.Col span={5} offset={1} className={classes.advantage}>
                <Flex gap={5}>
                    <Box className={classes.number}>2</Box>
                    <Box className={classes.benefit}>Скорость</Box>
                </Flex>
                <Text className={classes.title}>С нами вы будете работать быстрее, чем ваши конкуренты.</Text>
                <Text className={classes.subTitle}>Автоматическое оформление заказа в 3 клика, и мы готовы выдать вам весь ваш заказ в течение 3 часов после оплаты.</Text>
            </Grid.Col>
            <Grid.Col span={5}>
                <Image component={NextImage} src="./images/homepage/advantage_1_2.svg" width={397} height={488} fit="contain" alt="Лучшая цена на рынке"/>
            </Grid.Col>
        </Grid>
    )
}

export default Advantages;