'use client'

import {Avatar, Group, UnstyledButton, Text} from "@mantine/core";
import classes from "./user.module.css";
import {useGetUserQuery} from "@/store/api/user.api";

const SidebarInfoUser = () => {

    const {data: user} = useGetUserQuery('');

    return (
        <UnstyledButton className={classes.userInfo}>
            <Group>
                <Avatar size={36} variant="filled" color="red">{`${user?.name.substr(0, 1)}${user?.surname.substr(0, 1)}`}</Avatar>
                <Text className={classes.userInfoLabel} >{`${user?.name} ${user?.surname}`}</Text>
            </Group>
        </UnstyledButton>
    )
}

export default SidebarInfoUser;