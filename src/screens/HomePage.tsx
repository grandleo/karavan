'use client'

import {BackgroundImage, Box, Center, Container, Divider, Flex, Image, Text} from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";
import LanguageSwitch from "@/components/LanguageSwitch";
import ModalAuth from "@/features/auth/components/ModalAuth/ModalAuth";
import {HeaderHome} from "@/components/ui/header";
import {HomeFooter} from "@/components/ui/Footer";
import {IconCameraFilled, IconDeviceLaptop, IconDeviceMobile, IconDots} from "@tabler/icons-react";

const HomePage = () => {
    return (
        <>
            <HeaderHome/>
            <Container mt={120} size="lg" mb={30}>
                <Text
                    style={{
                        color: '#000',
                        fontSize: '22px',
                        fontWeight: '500',
                        lineHeight: '24px',
                    }}
                >Категории с которыми работаем</Text>
                <Box
                    style={{
                        background: '#F2F5FF', padding: '45px 70px'
                    }}
                >
                    <Flex justify="space-between">
                    <Box>
                        <IconDeviceMobile stroke={1} />
                        <Text
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontWeight: '500',
                                lineHeight: '23px',
                            }}
                        >Мобильные телефоны</Text>
                    </Box>
                    <Divider orientation="vertical"/>
                    <Box>
                        <IconDeviceLaptop stroke={1} />
                        <Text
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontWeight: '500',
                                lineHeight: '23px',
                            }}
                        >IT Продукты</Text>
                    </Box>
                    <Divider orientation="vertical"/>

                    <Box>
                        <IconCameraFilled />
                        <Text
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontWeight: '500',
                                lineHeight: '23px',
                            }}
                        >Фото и Видео</Text>
                    </Box>
                    <Divider orientation="vertical"/>

                    <Box>
                        <IconDots stroke={2} />
                        <Text
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontWeight: '500',
                                lineHeight: '23px',
                            }}
                        >Что-то ещё</Text>
                    </Box></Flex>
                </Box>
            </Container>
            <Container size="lg">
                <Flex gap={12}>
                    <BackgroundImage
                        src="/images/homepage/image_3.png"
                        radius="sm"
                    >
                        <Box style={{padding: '60px 80px 80px 80px'}}>
                            <Text c="white"
                                  style={{
                                      fontSize: '14px',
                                      fontWeight: '500',
                                      lineHeight: '20.3px',
                                      letterSpacing: '1px',
                                      textAlign: 'center'
                                  }}
                                  mb={300}>
                                ДЛЯ КЛИЕНТОВ
                            </Text>
                            <Text c="white"
                                  style={{
                                      fontSize: '40px',
                                      fontWeight: '500',
                                      lineHeight: '44px',
                                      letterSpacing: '-1px',
                                  }}
                                  mb={75}
                            >
                                Выгодно, быстро и удобно в Karavan
                            </Text>
                            <Text c="white">
                                Доступ к лучшим предложениям от множества поставщиков в пару кликов. Отслеживайте статус
                                заказа на каждом этапе.
                            </Text>
                        </Box>
                    </BackgroundImage>
                    <BackgroundImage
                        src="/images/homepage/image_1.png"
                        radius="sm"
                    >
                        <Box style={{padding: '60px 80px 80px 80px'}}>
                            <Text
                                c="white"
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    lineHeight: '20.3px',
                                    letterSpacing: '1px',
                                    textAlign: 'center'
                                }}
                                mb={300}
                            >
                                ДЛЯ ПОСТАВЩИКОВ
                            </Text>
                            <Text c="white"
                                  style={{
                                      fontSize: '40px',
                                      fontWeight: '500',
                                      lineHeight: '44px',
                                      letterSpacing: '-1px',
                                  }}
                                  mb={75}
                            >
                                Получайте новых клиентов и увеличивайте продажи
                            </Text>
                            <Text c="white"
                                  style={{
                                      fontSize: '18px',
                                      fontWeight: '400',
                                      lineHeight: '26px',
                                  }}>
                                Ваш онлайн-сток в телеграмм-ботте. Откройте для себя и ваших клиентов удобное место для
                                ведения бизнеса
                            </Text></Box>
                    </BackgroundImage>

                </Flex>
            </Container>
            <HomeFooter/>

        </>
    )
}

export default HomePage;