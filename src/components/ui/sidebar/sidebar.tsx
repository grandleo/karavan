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
import {useGetWarehousesQuery} from "@/store/api/warehouses.api";
import AddWarehouses from "@/components/screens/general/addWarehouses";
import {useGetMenuItemsQuery} from "@/store/api/menu.api";
import {Fragment} from "react";

interface Props {
    light?: boolean,
    className: string;
}

const Sidebar = ({light}: Props) => {
    const {data: user} = useGetUserQuery('');
    const {data: menuItems} = useGetMenuItemsQuery('');

    return (
        <Box className={`${classes.sidebar} ${light ? classes.sidebarLight : null}`}>
            <Box className={classes.sidebarHeader}>
                <LogoMinimal/>
            </Box>
            <ScrollArea className={classes.sidebarMenu}>
                {/*{(() => {*/}
                {/*    switch (user?.role) {*/}
                {/*        case 'admin':*/}
                {/*            return <AdminMenu/>;*/}
                {/*        case 'supplier':*/}
                {/*            return <SupplierMenu/>;*/}
                {/*        case 'client':*/}
                {/*            return <ClientMenu/>;*/}
                {/*        default:*/}
                {/*            return <LogisticMenu />;*/}
                {/*    }*/}
                {/*})()}*/}
                {menuItems?.map((menuItem: any, index: number) => {
                    return (
                        <Fragment key={index}>
                            {menuItem.children?.length > 0 ? (
                                <>
                                    <NavLink
                                        label={menuItem.name}
                                        // leftSection={<IconGauge size="1rem" stroke={1.5} />}
                                        childrenOffset={28}
                                    >
                                        {menuItem.children.map((children: any, index: number) => {
                                            return (
                                                <Fragment key={index}>
                                                    <NavLink component={Link} label={children.name} href={children.url}/>
                                                </Fragment>
                                            )
                                        })}
                                    </NavLink>
                                </>
                            ) : (
                                <NavLink component={Link} label={menuItem.name} href={menuItem.url}/>
                            )}
                        </Fragment>
                    )
                })}


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
    const {data} = useGetWarehousesQuery('');

    return (
        <>
            <NavLink
                label="Склады"
                leftSection={<IconGauge size="1rem" stroke={1.5} />}
                childrenOffset={28}
            >
                {data?.map((warehouse: any, index: number) => {
                    return (
                        <NavLink label={warehouse.address} key={warehouse.id}
                                 component={Link}
                                 href={`${process.env.NEXT_PUBLIC_URL}/supplier/${warehouse.id}`}
                                 style={{marginLeft: '20px'}}/>
                    )
                })}
            </NavLink>
            <NavLink component={Link} href={`${process.env.NEXT_PUBLIC_URL}/supplier/orders`} label="Заказы" />
            <NavLink
                label="Настройки"
                leftSection={<IconGauge size="1rem" stroke={1.5} />}
                childrenOffset={28}
            >
                <NavLink label="Добавить склад" component={Link} href={`${process.env.NEXT_PUBLIC_URL}/supplier/settings/warehouses`}/>
                <NavLink label="Настройка 2" />
            </NavLink>
        </>
    )
}

const ClientMenu = () => {
    const {data} = useGetWarehousesQuery('');

    return (
        <>
            <NavLink
                label="Склады"
                leftSection={<IconGauge size="1rem" stroke={1.5} />}
                childrenOffset={28}
            >
                {data?.map((warehouse: any, index: number) => {
                    return (
                        <NavLink label={warehouse.address} key={warehouse.id}
                                 component={Link}
                                 href={`${process.env.NEXT_PUBLIC_URL}/client/${warehouse.id}`}
                                 style={{marginLeft: '20px'}}/>
                    )
                })}
            </NavLink>
            <NavLink component={Link} href={`${process.env.NEXT_PUBLIC_URL}/client/orders`} label="Заказы" />
            <NavLink
                label="Настройки"
                leftSection={<IconGauge size="1rem" stroke={1.5} />}
                childrenOffset={28}
            >
                <NavLink label="Добавить склад" component={Link} href={`${process.env.NEXT_PUBLIC_URL}/client/settings/warehouses`}/>
                <NavLink label="Настройка 2" />
            </NavLink>
        </>
    )
}


const LogisticMenu = () => {
    const {data} = useGetWarehousesQuery('');

    return (
        <>
            <NavLink
                label="Склады"
                leftSection={<IconGauge size="1rem" stroke={1.5} />}
                childrenOffset={28}
            >
                {data?.map((warehouse: any, index: number) => {
                    return (
                        <NavLink label={warehouse.address} key={warehouse.id}
                                 component={Link}
                                 href={`${process.env.NEXT_PUBLIC_URL}/client/${warehouse.id}`}
                                 style={{marginLeft: '20px'}}/>
                    )
                })}
            </NavLink>
            <NavLink component={Link} href={`${process.env.NEXT_PUBLIC_URL}/client/orders`} label="Заказы" />
            <NavLink
                label="Настройки"
                leftSection={<IconGauge size="1rem" stroke={1.5} />}
                childrenOffset={28}
            >
                <NavLink label="Добавить склад" component={Link} href={`${process.env.NEXT_PUBLIC_URL}/client/settings/warehouses`}/>
                <NavLink label="Настройка 2" />
            </NavLink>
        </>
    )
}

export default Sidebar;