import {ReactNode} from "react";
import {Box, Flex} from "@mantine/core";
import Sidebar from "@/components/Sidebar";
import classes from "./DashboardLayout.module.css";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({children} : DashboardLayoutProps) => {
    return (
        <>
            <Flex wrap="nowrap" className={classes.dashboardWrapper}>
                <Box className={classes.dashboardSidebar}>
                    <Sidebar/>
                </Box>
                <Box className={classes.dashboardContent}>{children}</Box>
            </Flex>
        </>
    )
}

export default DashboardLayout;