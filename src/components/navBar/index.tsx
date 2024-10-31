'use client'

import {Group, Code, ScrollArea, Skeleton, Flex} from '@mantine/core';
import LinksGroupNB from "@/components/ui/Links/LinksGroupNB";
import {useGetMenuItemsQuery} from "@/store/api/menu.api";
import classes from "./styles.module.css";
import UserLogo from "@/components/navBar/components/userLogo";
import UserLogout from "@/components/navBar/components/userLogout";
import {useEffect, useState} from "react";
import UserInfo from "@/components/navBar/components/userInfo";
import { useRouter } from 'next/router';
import Menu from "@/features/menuItems/components/Menu/Menu";

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
    const {data: menuItems, isLoading} = useGetMenuItemsQuery('');
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setShowSkeleton(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    const menu = menuItems?.map((item: ILink, index: number) => <LinksGroupNB {...item} key={index} theme={theme}/>);

    return (
        <>
            <nav className={theme === 'dark' ? classes.navbarDark : classes.navbar}>
                <div className={classes.header}>
                    <UserLogo/>
                </div>

                <Menu />

                <ScrollArea className={classes.links}>
                    {showSkeleton &&
                        Array.from({ length: 10 }, (_, index) => (
                            <Flex align="center" gap={16} p="10px 16px" key={index}>
                                <Skeleton height={30} width={30} />
                                <Skeleton height={16} style={{ flex: 1 }} />
                            </Flex>
                        ))}
                    {!showSkeleton && menu}
                </ScrollArea>

                <div className={classes.footer}>
                    <UserInfo/>
                    <UserLogout/>
                </div>
            </nav>
        </>
    );
}

export default NavBar;