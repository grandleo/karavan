import {Button, Text} from "@mantine/core";
import classes from "@/components/navBar/styles.module.css";
import {logout} from "@/helpers/auth";
import {IconLogout} from "@tabler/icons-react";

const UserLogout = () => {
    return (
        <Button variant="transparent" className={classes.logout} onClick={() => logout(true)}>
            <IconLogout /> <Text className={classes.logoutText}>Выйти</Text>
        </Button>
    )
}

export default UserLogout;