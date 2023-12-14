import {Box} from "@mantine/core"
import classes from "./layout.module.css";
import Sidebar from "@/components/ui/sidebar/sidebar";
import NavBar from "@/components/ui/NavBar/NavBar";

interface Props {
    children: React.ReactNode,
}

const UserControlPanelLayout = ({children}: Props) => {
    return (
        <>
            <Box className={classes.controlPanelWrapper}>
                <Box className={classes.controlPanelContainer}>
                    <NavBar/>
                    <Box className={classes.controlPanelContent}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default UserControlPanelLayout;