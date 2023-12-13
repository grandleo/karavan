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

export default Sidebar;