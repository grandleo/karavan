'use client'

import {Group, Code, ScrollArea} from '@mantine/core';
import LinksGroupNB from "@/components/ui/Links/LinksGroupNB";
import LogoMinimal from "@/components/ui/logo/logoMinimal";
import UserInfo from "@/components/ui/NavBar/UserInfo";
import Logout from "@/components/ui/NavBar/Logout";
import {useGetMenuItemsQuery} from "@/store/api/menu.api";
import classes from "./navbar.module.css";

enum Theme {
    Light = "light",
    Dark = "dark",
}

interface NavBarProps {
    theme?: string;
}

interface ILink {
    icon: string;
    name: string;
    initiallyOpened?: boolean;
    children?: { name: string; url: string }[];
    url: string;
    theme: string;
}

const NavBar = ({theme = Theme.Light}: NavBarProps) => {
    const {data: menuItems} = useGetMenuItemsQuery('');

    const menu = menuItems?.map((item: ILink, index: number) => <LinksGroupNB {...item} key={index} theme={theme} />);

    return (
        <>
            <nav className={theme === 'dark' ? classes.navbarDark : classes.navbar}>
                <div className={classes.header}>
                    <LogoMinimal/>
                </div>

                <ScrollArea className={classes.links}>
                    <div className={classes.linksInner}>{menu}</div>
                </ScrollArea>

                <div className={classes.footer}>
                    <UserInfo/>
                    <Logout/>
                    <Group justify="center" mt={8}>
                        <Code fw={700}>
                            v{process.env.NEXT_PUBLIC_VERSION_PROJECT}
                        </Code>
                    </Group>
                </div>
            </nav>
        </>
    );
}

export default NavBar;