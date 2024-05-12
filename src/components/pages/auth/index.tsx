import NextImage from "next/image";
import {Box, Flex, Image} from "@mantine/core";
import classes from './auth.module.css';
import Authentication from "@/components/auth";

const Auth = () => {

    return (
        <Flex className={classes.authContainer} align="center">
            <Box className={classes.authForm}>
                <Box className={classes.formBlock}>
                    <Image component={NextImage} src="./images/logo.svg" fit="contain" width={180} height={46} alt="" mb={60}/>

                    <Authentication/>
                </Box>
            </Box>
            <Box className={classes.authImageBg}></Box>
        </Flex>
    )
}

export default Auth;