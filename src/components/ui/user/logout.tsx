'use client'

import {Button, Text} from "@mantine/core";
import classes from "./user.module.css";
import {IconLogout} from "@tabler/icons-react";
import { useSession, signIn, signOut } from "next-auth/react"

const Logout = () => {

    return (
        <>
            <Button variant="outline" className={classes.logoutBtn} onClick={() => signOut()}>
                <IconLogout /> <Text className={classes.logoutLabel}>Выйти</Text>
            </Button>
        </>
    )
}

export default Logout;