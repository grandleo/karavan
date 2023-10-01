import classes from "./layout.module.css";
import {Box} from "@mantine/core";
import Sidebar from "@/components/ui/sidebar/sidebar";

interface Props {
    children: React.ReactNode,
}

const AdminLayout = ({children}: Props) => {
    return (
        <Box className={classes.controlPanelWrapper}>
            <Box className={classes.controlPanelContainer}>
                <Sidebar className={classes.controlPanelSidebar}/>
                <Box className={classes.controlPanelContent}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default AdminLayout;