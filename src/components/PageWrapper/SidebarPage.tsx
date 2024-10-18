import {ReactNode} from "react";
import {Box} from "@mantine/core";
import classes from "./PageWrapper.module.css";

interface SidebarPageProps {
    children?: ReactNode;
    bg_white?: boolean;
}

const SidebarPage = ({children, bg_white}: SidebarPageProps) => {
    return (
        <Box
            className={bg_white ? classes.sidebarPageWrapperWhite : classes.sidebarPageWrapperTransparent}
            style={{minWidth: '300px'}}>
            {children}
        </Box>
    )
}

export default SidebarPage;