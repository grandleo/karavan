'use client'

import {useEffect, useState} from "react";
import {Avatar, Box, Flex, Skeleton, Text} from "@mantine/core";
import {getUser} from "@/features/auth/utils/userUtil";
import classes from "./UserInfo.module.css";

const UserInfo = () => {
    const [user, setUser] = useState<object | null>(null);
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);

                // Добавляем задержку в 300 мс перед скрытием скелетона
                setTimeout(() => {
                    setShowSkeleton(false);
                }, 300);
            } catch (error) {
                console.error('Ошибка при получении пользователя:', error);
                setShowSkeleton(false); // Скрываем скелетон даже при ошибке
            }
        };

        fetchUser();
    }, []);

    if (showSkeleton) {
        return (
            <Flex gap={12} mb={12} align="center">
                <Skeleton height={48} width={48} radius={50} />
                <Flex gap={8} style={{flexGrow: 1}} direction="column">
                    <Skeleton height={16} />
                    <Skeleton height={16} />
                </Flex>
            </Flex>
        );
    }

    if (!user) {
        // Если данные пользователя отсутствуют после загрузки, можно вернуть null или отобразить сообщение
        return null;
    }

    return (
        <Flex gap={12} mb={12} align="center">
            <Avatar name={user?.full_name} color="initials" variant="light" size={48}/>
            <Box p="relative">
                <Text className={classes.fullName} truncate="end">{user?.full_name} {user?.full_name}</Text>
                <Text className={classes.roleName}>{user?.role_name}</Text>
            </Box>
        </Flex>
    )
}

export default UserInfo;