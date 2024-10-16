'use client'

import { Burger, Container, Flex, Group, Image, Text } from "@mantine/core";
import NextImage from "next/image";
import classes from "@/components/ui/header/style.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import LanguageSwitch from "@/components/LanguageSwitch";
import { Link as ScrollLink } from 'react-scroll';
import Link from "next/link";
import ModalAuth from "@/features/auth/components/ModalAuth/ModalAuth";

const HeaderHome = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [openedMenu, { toggle: toggleMenu }] = useDisclosure(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 30);  // Устанавливаем фиксацию хедера при прокрутке
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header className={`${classes.header} ${isSticky ? classes.fixedHeader : classes.stickyHeader}`}>
                <Container size="md" className={classes.inner}>
                    <Flex align="center" justify="space-between">
                        <Text component={Link} href="/">
                            <Image
                                component={NextImage}
                                src="/logo.svg"
                                width={100}
                                height={25}
                                fit="contain"
                                alt="Karavan"
                            />
                        </Text>

                        <Group gap={32} visibleFrom="xs">
                            <Text className={classes.link} component={ScrollLink} to="capability" smooth={true} duration={1500}>
                                Преимущества
                            </Text>
                            <Text className={classes.link} component={ScrollLink} to="download" smooth={true} duration={1500}>
                                Скачать
                            </Text>
                            <Text className={classes.link} component={ScrollLink} to="footer" smooth={true} duration={1500}>
                                Контакты
                            </Text>
                        </Group>

                        <Flex align="center" gap={16}>
                            <LanguageSwitch />
                            <ModalAuth />
                            <Burger opened={openedMenu} onClick={toggleMenu} hiddenFrom="xs" size="sm" />
                        </Flex>
                    </Flex>
                </Container>
            </header>
        </>
    );
};

export default HeaderHome;