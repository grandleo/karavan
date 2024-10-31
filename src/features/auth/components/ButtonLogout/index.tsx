'use client'

import {Button} from "@mantine/core";
import {useLogout} from "@/features/auth/hooks/useLogout";

const ButtonLogout = () => {
    const { logout, isLoading } = useLogout();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Button fullWidth onClick={handleLogout} loading={isLoading}>Выйти</Button>
    )
}

export default ButtonLogout;