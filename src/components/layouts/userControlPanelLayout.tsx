import {Box} from "@mantine/core"
import classes from "./layout.module.css";
import NavBar from "@/components/navBar";

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