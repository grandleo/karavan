import {Box} from "@mantine/core";
import classes from "./page.module.css";

interface Props {
    children: React.ReactNode
}


const PageWrapper = ({children}: Props) => {
    return (
        <Box className={`${classes.pageWrapper}`}>
            {children}
        </Box>
    )
}

export default PageWrapper;