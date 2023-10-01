import {Box, Container} from "@mantine/core";
import classes from './layout.module.css';
import AuthHeaders from "@/components/layouts/headers/authHeader";

interface Props {
    children: React.ReactNode,
}

const AuthLayout = ({children}: Props) => {

    return (
        <Container fluid className={classes.container}>
            <Box className={classes.containerFlex}>
                <Box className={classes.leftColumn}>
                    <AuthHeaders />
                    {children}
                </Box>
                <Box className={classes.rightColumn}></Box>
            </Box>
        </Container>
    )
}

export default AuthLayout;