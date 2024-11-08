'use client'

import {BackgroundImage, Box, Container, Divider, Flex, Text} from "@mantine/core";
import {HeaderHome} from "@/components/ui/header";
import {HomeFooter} from "@/components/ui/Footer";
import {IconCameraFilled, IconDeviceLaptop, IconDeviceMobile, IconDots} from "@tabler/icons-react";
import {useMediaQuery} from "@mantine/hooks";
import {useLanguage} from "@/providers/LanguageProvider";
import {useTranslation} from "@/hooks/useTranslation";

const HomePage = () => {
    const {trans} = useTranslation();
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
                >
                    {trans('home', 'categories.title')}
                </Text>
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
                            >
                                {trans('home', 'categories.category_1')}
                            </Text>
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
                            >
                                {trans('home', 'categories.category_2')}
                            </Text>
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
                            >

                                {trans('home', 'categories.category_3')}
                            </Text>
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
                            >

                                {trans('home', 'categories.category_4')}
                            </Text>
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

                                {trans('home', 'banners.clients.subtitle')}
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
                                {trans('home', 'banners.clients.title')}
                            </Text>
                            <Text c="white"
                                  style={{
                                      fontSize: isSmallScreen ? '14px' : '18px',
                                      fontWeight: '400',
                                      lineHeight: isSmallScreen ? '15px' : '26px',
                                  }}>
                                {trans('home', 'banners.clients.description')}
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
                                {trans('home', 'banners.suppliers.subtitle')}
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
                                {trans('home', 'banners.suppliers.title')}
                            </Text>
                            <Text c="white"
                                  style={{
                                      fontSize: isSmallScreen ? '14px' : '18px',
                                      fontWeight: '400',
                                      lineHeight: isSmallScreen ? '15px' : '26px',
                                  }}>
                                {trans('home', 'banners.suppliers.description')}
                            </Text></Box>
                    </BackgroundImage>

                </Flex>
            </Container>
            <HomeFooter/>

        </>
    )
}

export default HomePage;