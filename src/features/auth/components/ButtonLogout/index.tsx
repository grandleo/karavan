'use client'

import {Button} from "@mantine/core";
import {useLogout} from "@/features/auth/hooks/useLogout";
import {useTranslation} from "@/hooks/useTranslation";

const ButtonLogout = () => {
    const { logout, isLoading } = useLogout();
    const { trans } = useTranslation();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Button fullWidth onClick={handleLogout} loading={isLoading}>{trans('buttons', 'logout')}</Button>
    )
}

export default ButtonLogout;