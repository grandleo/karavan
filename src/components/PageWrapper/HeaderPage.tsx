import {Box, Button} from "@mantine/core";
import classes from "./PageWrapper.module.css";

const HeaderPage = () => {
    return (
        <Box className={classes.headerPageWrapper}>
            <Button>Кнопка любая</Button>
        </Box>
    )
}

export default HeaderPage;