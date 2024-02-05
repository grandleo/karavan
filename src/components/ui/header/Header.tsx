import {Anchor, Box, Button, Container, Flex, Group, SegmentedControl} from "@mantine/core";
import Logo from "@/components/ui/header/Logo";
import classes from "./header.module.css";
import Auth from "@/components/ui/auth/Auth";
import {useState} from "react";

const menuItems = [
    {
        title: 'Пункт 1',
        link: '#'
    },
    {
        title: 'Пункт 2',
        link: '#'
    },
    {
        title: 'Пункт 3',
        link: '#'
    },
]

const Header = () => {

    return (
        <>
            <header className={classes.header}>
                <Container>
                    <Flex className={classes.headerFlex}>
                        <Logo/>
                        {/*<Group justify="center" className={classes.menu}>*/}
                        {/*    {menuItems.map((menu, index: number) => {*/}
                        {/*        return (*/}
                        {/*            <Anchor key={index} href={menu.link} className={classes.link}>*/}
                        {/*                {menu.title}*/}
                        {/*            </Anchor>*/}
                        {/*        )*/}
                        {/*    })}*/}
                        {/*</Group>*/}
                        <Auth/>
                    </Flex>
                </Container>
            </header>
        </>
    )
}

export default Header;