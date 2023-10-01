'use client'

import {Button, Text} from "@mantine/core";
import classes from "./user.module.css";
import {IconLogout} from "@tabler/icons-react";
import { useSession, signIn, signOut } from "next-auth/react"

const Logout = () => {
    // const router = useRouter();

    // const logoutHandle = () => {
    //     http.get(LOGOUT_URL).then(function (response) {
    //         // обработка успешного запроса
    //         console.log(response);
    //         Cookies.remove('token');
    //         router.push('login');
    //     })
    //         .catch(function (error) {
    //             // обработка ошибки
    //             console.log(error);
    //         });
    // }


    return (
        <>
            <Button variant="outline" className={classes.logoutBtn} >
                <IconLogout /> <Text className={classes.logoutLabel}>Выйти</Text>
            </Button>
            <button onClick={() => signOut()}>Sign out</button>
        </>
    )
}

export default Logout;