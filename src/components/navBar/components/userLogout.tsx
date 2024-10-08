import {Button, Text} from "@mantine/core";
import classes from "@/components/navBar/styles.module.css";
import {IconLogout} from "@tabler/icons-react";
import {useLogout} from "@/features/auth/hooks/useLogout";

const UserLogout = () => {
    const { logout, isLoading } = useLogout();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Button variant="transparent" className={classes.logout} onClick={handleLogout} loading={isLoading}>
            <IconLogout /> <Text className={classes.logoutText}>Выйти</Text>
        </Button>
    )
}

export default UserLogout;