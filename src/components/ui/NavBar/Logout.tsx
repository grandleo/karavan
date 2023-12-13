import {Button, Text} from "@mantine/core";
import {signOut} from "next-auth/react";
import {IconLogout} from "@tabler/icons-react";
import classes from "./navbar.module.css";

const Logout = () => {
    return (
        <>
            <Button variant="outline" fullWidth className={classes.logout} onClick={() => signOut()}>
                <IconLogout /> <Text className={classes.logoutText}>Выйти</Text>
            </Button>
        </>
    )
}

export default Logout;