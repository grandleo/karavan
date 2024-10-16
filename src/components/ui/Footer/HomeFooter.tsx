import {Box, Container, Flex, Image, Text} from "@mantine/core";
import classes from "@/components/ui/Footer/style.module.css";
import Link from "next/link";
import NextImage from "next/image";

const HomeFooter = () => {
    return (
        <Box className={classes.homeFooter} id="footer">
            <Container size="md">
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align="center"
                    justify="space-between"
                    mb={{ base: 8, md: 24 }}>
                    <Image
                        component={NextImage}
                        src="logo.svg"
                        width={100}
                        height={25}
                        fit="contain"
                        alt="Karavan"/>
                    <Flex gap={{ base: 8, md: 32 }} direction={{ base: 'column', md: 'row' }}>
                        <Text component={Link} href='/privacy'>Политика конфидециальности</Text>
                        <Text component={Link} href="/processing">Политика обработки данных</Text>
                    </Flex>
                </Flex>
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align="center"
                    justify="space-between">
                    <Flex gap={{ base: 8, md: 32 }} direction={{ base: 'column', md: 'row' }}>
                        <Text component={Link} href="mailto:info@karavan.ru">info@karavan.ru</Text>
                        <Text component={Link} href="tel:+79257712240">+7 (925) 771-22-40</Text>
                    </Flex>
                    <Text mt={{ base: 24, md: 0 }}>Москва, Ленинградский пр., д. 39, стр.79</Text>
                </Flex>
                <Box>
                    <Text className={classes.copyright}>© 2024 Караван. Все права защищены.</Text>
                </Box>
            </Container>
        </Box>
    )
}

export default HomeFooter;