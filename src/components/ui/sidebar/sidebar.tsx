import {Box, NavLink, ScrollArea} from "@mantine/core";
import {IconGauge} from "@tabler/icons-react";

import classes from "./sidebar.module.css";
import LogoMinimal from "@/components/ui/logo/logoMinimal";
import SidebarInfoUser from "@/components/ui/user/sidebarInfoUser";
import Logout from "@/components/ui/user/logout";

interface Props {
    light?: boolean,
    className: string;
}

const Sidebar = ({light}: Props) => {
    return (
        <Box className={`${classes.sidebar} ${light ? classes.sidebarLight : null}`}>
            <Box className={classes.sidebarHeader}>
                <LogoMinimal/>
            </Box>
            <ScrollArea className={classes.sidebarMenu}>
                <NavLink label="Клиенты" />
                <NavLink label="Поставщики" />
                <NavLink label="Логисты" />
                <NavLink label="Номеклатура" />
                <NavLink
                    label="Настройки"
                    leftSection={<IconGauge size="1rem" stroke={1.5} />}
                    childrenOffset={28}
                >
                    <NavLink label="Настройки 1" />
                    <NavLink label="Настройки 2" />
                </NavLink>
            </ScrollArea>
            <Box className={classes.sidebarFooter}>
                <SidebarInfoUser/>
                <Logout/>
            </Box>
        </Box>
    )
}

export default Sidebar;