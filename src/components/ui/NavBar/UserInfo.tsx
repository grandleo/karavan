import {Avatar, Group, LoadingOverlay, Text, UnstyledButton} from "@mantine/core";
import {useGetUserQuery} from "@/store/api/user.api";
import classes from "./navbar.module.css";

const UserInfo = () => {
    const {data: user, isLoading} = useGetUserQuery('');

    return (
        <UnstyledButton className={classes.userInfo}>
            <Group>
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: '#3B9F98'}}/>
                <Avatar size={36} variant="filled" color="red">{`${user?.name.substr(0, 1)}${user?.surname.substr(0, 1)}`}</Avatar>
                <Text className={classes.userInfoText} >{`${user?.name} ${user?.surname}`}</Text>
            </Group>
        </UnstyledButton>
    )
}

export default UserInfo;