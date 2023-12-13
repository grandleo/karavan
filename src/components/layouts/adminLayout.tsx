import classes from "./layout.module.css";
import {Box} from "@mantine/core";
import Sidebar from "@/components/ui/sidebar/sidebar";
import NavBar from "@/components/ui/NavBar/NavBar";

interface Props {
    children: React.ReactNode,
}

const AdminLayout = ({children}: Props) => {
    return (
        <Box className={classes.controlPanelWrapper}>
            <Box className={classes.controlPanelContainer}>
                {/*<Sidebar className={classes.controlPanelSidebar}/>*/}
                <NavBar theme="dark"/>
                <Box className={classes.controlPanelContent}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default AdminLayout;