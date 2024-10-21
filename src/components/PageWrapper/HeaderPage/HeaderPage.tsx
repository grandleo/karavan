import {Box, Button} from "@mantine/core";
import classes from "../PageWrapper.module.css";
import {ReactNode} from "react";

interface SidebarPageProps {
    children?: ReactNode;
}

const HeaderPage = ({children}) => {
    return (
        <Box className={classes.headerPageWrapper}>
            {children}
        </Box>
    )
}

export default HeaderPage;