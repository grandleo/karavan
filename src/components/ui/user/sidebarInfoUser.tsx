import {Avatar, Group, UnstyledButton, Text} from "@mantine/core";
import classes from "./user.module.css";

const SidebarInfoUser = () => {

    return (
        <UnstyledButton className={classes.userInfo}>
            <Group>
                <Avatar size={36} variant="filled" color="red">АЧ</Avatar>
                <Text className={classes.userInfoLabel} >Александр Черныш</Text>
            </Group>
        </UnstyledButton>
    )
}

export default SidebarInfoUser;