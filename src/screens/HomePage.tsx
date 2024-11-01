'use client'

import {BackgroundImage, Box, Container, Divider, Flex, Text} from "@mantine/core";
import {HeaderHome} from "@/components/ui/header";
import {HomeFooter} from "@/components/ui/Footer";
import {IconCameraFilled, IconDeviceLaptop, IconDeviceMobile, IconDots} from "@tabler/icons-react";
import {useMediaQuery} from "@mantine/hooks";

const HomePage = () => {
    const isSmallScreen = useMediaQuery('(max-width: 768px)');

    return (
        <>
            <HeaderHome/>
            <Container mt={120} size="lg" mb={30}>
                <Text
                    style={{
                        color: '#000',
                        fontSize: isSmallScreen ? '16px' : '22px',
                        fontWeight: '500',
                        lineHeight: '24px',
                        marginBottom: '20px',
                    }}
                >Категории с которыми работаем</Text>
                <Box
                    style={{
                        background: '#F2F5FF',
                        overflowX: 'auto', // позволяет горизонтальный скролл
                        whiteSpace: 'nowrap', // предотвращает перенос элементов на новую строку
                    }}
                    p={{base: '16px 16px', sm: '45px 70px'}}
                >
                    <Flex justify="space-between" gap={16}>
                        <Box>
                            <IconDeviceMobile stroke={1}/>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: isSmallScreen ? '14px' : '18px',
                                    fontWeight: '500',
                                    lineHeight: '23px',
                                }}
                            >Мобильные телефоны</Text>
                        </Box>
                        <Divider orientation="vertical"/>
                        <Box>
                            <IconDeviceLaptop stroke={1}/>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: isSmallScreen ? '14px' : '18px',
                                    fontWeight: '500',
                                    lineHeight: '23px',
                                }}
                            >IT Продукты</Text>
                        </Box>
                        <Divider orientation="vertical"/>

                        <Box>
                            <IconCameraFilled/>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: isSmallScreen ? '14px' : '18px',
                                    fontWeight: '500',
                                    lineHeight: '23px',
                                }}
                            >Фото и Видео</Text>
                        </Box>
                        <Divider orientation="vertical"/>

                        <Box>
                            <IconDots stroke={2}/>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: isSmallScreen ? '14px' : '18px',
                                    fontWeight: '500',
                                    lineHeight: '23px',
                                }}
                            >И другие</Text>
                        </Box>
                    </Flex>
                </Box>
            </Container>
            <Container size="lg">
                <Flex gap={12} direction={{base: 'column', sm: 'row'}} justify="space-between">
                    <BackgroundImage
                        src="/images/homepage/image_3.png"
                        radius="sm"
                    >
                        <Box p={{base: '12px', sm: '60px 80px 80px 80px'}}>
                            <Text c="white"
                                  style={{
                                      fontSize: '14px',
                                      fontWeight: '500',
                                      lineHeight: '20.3px',
                                      letterSpacing: '1px',
                                      textAlign: 'center'
                                  }}
                                  size="lg"
                                  mb={{base: '150px', sm: '300px'}}>
                                ДЛЯ КЛИЕНТОВ
                            </Text>
                            <Text c="white"
                                  style={{
                                      fontSize: isSmallScreen ? '28px' : '40px',
                                      fontWeight: '500',
                                      lineHeight: isSmallScreen ? '30px' : '44px',
                                      letterSpacing: '-1px',
                                  }}
                                  mb={{base: '20px', sm: '75px'}}
                            >
                                Выгодно, быстро и удобно в Karavan
                            </Text>
                            <Text c="white"
                                  style={{
                                      fontSize: isSmallScreen ? '14px' : '18px',
                                      fontWeight: '400',
                                      lineHeight: isSmallScreen ? '15px' : '26px',
                                  }}>
                                Доступ к лучшим предложениям от множества поставщиков в пару кликов. Отслеживайте статус
                                заказа на каждом этапе.
                            </Text>
                        </Box>
                    </BackgroundImage>
                    <BackgroundImage
                        src="/images/homepage/image_1.png"
                        radius="sm"
                    >
                        <Box p={{base: '12px', sm: '60px 80px 80px 80px'}}>
                            <Text
                                c="white"
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    lineHeight: '20.3px',
                                    letterSpacing: '1px',
                                    textAlign: 'center'
                                }}
                                mb={{base: '150px', sm: '300px'}}>
                                ДЛЯ ПОСТАВЩИКОВ
                            </Text>
                            <Text c="white"
                                  style={{
                                      fontSize: isSmallScreen ? '28px' : '40px',
                                      fontWeight: '500',
                                      lineHeight: isSmallScreen ? '30px' : '44px',
                                      letterSpacing: '-1px',
                                  }}
                                  mb={{base: '20px', sm: '75px'}}
                            >
                                Получайте новых клиентов и увеличивайте продажи
                            </Text>
                            <Text c="white"
                                  style={{
                                      fontSize: isSmallScreen ? '14px' : '18px',
                                      fontWeight: '400',
                                      lineHeight: isSmallScreen ? '15px' : '26px',
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