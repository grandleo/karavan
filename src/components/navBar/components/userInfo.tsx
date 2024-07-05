import {useGetUserQuery} from "@/store/api/user.api";
import {Avatar, Flex, Group, LoadingOverlay, Skeleton, Text, UnstyledButton} from "@mantine/core";
import classes from "@/components/navBar/styles.module.css";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

const UserInfo = () => {
    const {data: user, isLoading} = useGetUserQuery('');
    const [showSkeleton, setShowSkeleton] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setShowSkeleton(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (isLoading || showSkeleton) {
        return (
            <Flex gap={15} align="center" className={classes.userInfo}>
                <Skeleton height={48} width={48} />
                <Flex direction="column" gap={5} style={{ flex: 1 }}>
                    <Skeleton height={16} radius="xl" />
                    <Skeleton height={14} radius="xl" />
                </Flex>
            </Flex>
        );
    }

    const profileLink = `${process.env.NEXT_PUBLIC_URL}/${user.role}/profile`;

    return (
        <Flex
            gap={15}
            align="center"
            className={classes.userInfo}
            onClick={() => router.push(profileLink)}
            style={{ cursor: 'pointer' }}
        >
            <Avatar size={48} variant="filled" radius="xl" color="#436CFB">
                <Text className={classes.initials}>{user?.initials}</Text>
            </Avatar>
            <Flex direction="column" style={{ flex: 1 }} w={220}>
                <Text className={classes.userInfoName} truncate="end">{user?.name}</Text>
                <Text className={classes.userInfoRole}>{user?.role_ru}</Text>
            </Flex>
        </Flex>
    )
}

export default UserInfo;