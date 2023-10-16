'use client'
import {Box, NavLink, ScrollArea} from "@mantine/core";
import {IconGauge} from "@tabler/icons-react";

import classes from "./sidebar.module.css";
import LogoMinimal from "@/components/ui/logo/logoMinimal";
import SidebarInfoUser from "@/components/ui/user/sidebarInfoUser";
import Logout from "@/components/ui/user/logout";
import Link from "next/link";
import {useSelector} from "react-redux";
import {useGetUserQuery} from "@/store/api/user.api";

interface Props {
    light?: boolean,
    className: string;
}

const menu = [
    {
        'label': 'Клиенты',
        'link': process.env.NEXT_PUBLIC_URL + '/admin'
    },
    {
        'label': 'Клиенты',
        'link': process.env.NEXT_PUBLIC_URL + '/admin'
    },
    {
        'label': 'Клиенты',
        'link': process.env.NEXT_PUBLIC_URL + '/admin'
    },
    {
        'label': 'Клиенты',
        'link': process.env.NEXT_PUBLIC_URL + '/admin'
    },
]


const Sidebar = ({light}: Props) => {
    const {data: user} = useGetUserQuery('');

    return (
        <Box className={`${classes.sidebar} ${light ? classes.sidebarLight : null}`}>
            <Box className={classes.sidebarHeader}>
                <LogoMinimal/>
            </Box>
            <ScrollArea className={classes.sidebarMenu}>
                {user?.role === 'admin' ? <AdminMenu/> : <SupplierMenu/>}
            </ScrollArea>
            <Box className={classes.sidebarFooter}>
                <SidebarInfoUser/>
                <Logout/>
            </Box>
        </Box>
    )
}

const AdminMenu = () => {
    return (
        <>
            <NavLink component={Link} href="admin/" label="Клиенты" />
            <NavLink label="Поставщики" />
            <NavLink label="Логисты" />
            <NavLink label="Номеклатура" />
            <NavLink
                label="Настройки"
                leftSection={<IconGauge size="1rem" stroke={1.5} />}
                childrenOffset={28}
            >
                <NavLink component={Link} href={`${process.env.NEXT_PUBLIC_URL}/admin/settings/specifications`} label="Справочник" />
                <NavLink component={Link} href={`${process.env.NEXT_PUBLIC_URL}/admin/settings/catalog`} label="Номеклатура" />
            </NavLink>
        </>
    )
}

const SupplierMenu = () => {
    return (
        <>
            <NavLink component={Link} href={`${process.env.NEXT_PUBLIC_URL}/supplier`} label="Склады" />
            <NavLink component={Link} href={`${process.env.NEXT_PUBLIC_URL}/supplier/orders`} label="Заказы" />
            <NavLink
                label="Настройки"
                leftSection={<IconGauge size="1rem" stroke={1.5} />}
                childrenOffset={28}
            >
                <NavLink label="Настройка 1" />
                <NavLink label="Настройка 2" />
            </NavLink>
        </>
    )
}

export default Sidebar;