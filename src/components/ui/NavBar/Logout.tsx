import {Button, Text} from "@mantine/core";
import {IconLogout} from "@tabler/icons-react";
import classes from "./navbar.module.css";

const Logout = () => {
    return (
        <>
            <Button variant="outline" fullWidth className={classes.logout} onClick={() => console.log('test')}>
                <IconLogout /> <Text className={classes.logoutText}>Выйти</Text>
            </Button>
        </>
    )
}

export default Logout;