import {Burger, Button, Container, Flex, Group, Image, Modal, Text} from "@mantine/core";
import NextImage from "next/image";
import classes from "@/components/ui/header/style.module.css";
import {useDisclosure} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {modals} from "@mantine/modals";
import Authentication from "@/components/auth";

const HeaderHome = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [openedMenu, { toggle: toggleMenu }] = useDisclosure(false);
    const [openedLogin, { open: openLogin, close: closeLogin }] = useDisclosure(false);

    useEffect(() => {
        const handleScroll = () => {
            // Установите порог прокрутки, когда элемент становится фиксированным
            if (window.scrollY > 30) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        // Добавляем обработчик события прокрутки
        window.addEventListener('scroll', handleScroll);

        // Убираем обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header className={`${classes.header} ${isSticky ? classes.fixedHeader : classes.stickyHeader}`}>
                <Container size="md" className={classes.inner}>
                    <Flex align="center" justify="space-between">
                        <Image
                            component={NextImage}
                            src="images/karavan-logo.svg"
                            width={100}
                            height={25}
                            fit="contain"
                            alt="Karavan"/>

                        <Group gap={32} visibleFrom="xs">
                            <Text className={classes.link}>Преимущества</Text>
                            <Text className={classes.link}>Скачать</Text>
                            <Text className={classes.link}>Контакты</Text>
                        </Group>

                        <Flex align="center" gap={16}>
                            <Button onClick={openLogin}>Войти</Button>
                            <Burger opened={openedMenu} onClick={toggleMenu} hiddenFrom="xs" size="sm" />
                        </Flex>
                    </Flex>
                </Container>
                <Modal opened={openedLogin} onClose={closeLogin} title="Авторизация">
                    <Authentication/>
                </Modal>
            </header>
        </>
    )
}

export default HeaderHome;