import Menu from "@/features/menuItems/components/Menu/Menu";
import {Box, Divider, Flex, Image, ScrollArea} from "@mantine/core";
import classes from "./Sidebar.module.css";
import ButtonLogout from "@/features/auth/components/ButtonLogout";
import UserInfo from "@/features/auth/components/UserInfo";

const Sidebar = () => {
    return (
        <Flex direction="column" justify="space-between" className={classes.sidebar}>
            <Image src="/logo.svg" height={30} fit="contain" />
            <Divider mt={24} mb={24}/>
            <ScrollArea className={classes.sidebarMenu}>
                <Menu />
            </ScrollArea>
            <Divider mt={24} mb={24}/>
            <UserInfo/>
            <ButtonLogout/>
        </Flex>
    )
}

export default Sidebar;