'use client'

import {Box, Flex, Image, Text} from "@mantine/core";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import classes from './auth-header.module.css';
const AuthHeaders = () => {
    const pathname = usePathname();

    return (
        <Flex justify="space-between" className={classes.root}>
            <Image width={200} src="/images/logo-full.svg"/>

            {pathname == '/login' ? <NoAccount/> : <ThereIsAccount/>}
        </Flex>
    )
}

const NoAccount = () => {

    return (
        <Box>
            <Text className={classes.text}>Еще нет аккаунта?</Text>
            <Box>
                <Link href="/registration" className={classes.link}>Зарегистрироваться</Link>
            </Box>
        </Box>
    )
}

const ThereIsAccount = () => {

    return (
        <Box>
            <Text className={classes.text}>Есть аккаунт?</Text>
            <Box>
                <Link href="/login" className={classes.link}>Войти</Link>
            </Box>
        </Box>
    )
}

export default AuthHeaders;