'use client'

import {useEffect, useState} from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import {Box, Flex, NavLink, Skeleton} from "@mantine/core";
import {useFetchMenuItemsQuery} from "@/features/menuItems/api/menuItemsApi";
import {
    IconApiApp,
    IconBasket, IconBox,
    IconBuildingWarehouse,
    IconFileDollar, IconForklift,
    IconSettings,
    IconTruckLoading,
    IconUsers,
    IconUsersGroup
} from "@tabler/icons-react";

interface MenuItem {
    id: number;
    name: string;
    icon: string | null;
    url: string;
    children?: MenuItem[];
}

const getIconComponent = (iconName: string | null) => {
    switch (iconName) {
        case 'settings':
            return <IconSettings size={16} />;
        case 'clients':
            return <IconUsers size={16} />;
        case 'suppliers':
            return <IconUsersGroup size={16} />;
        case 'logistics':
            return <IconTruckLoading size={16} />;
        case 'warehouse':
            return <IconBuildingWarehouse size={16} />;
        case 'invoice':
            return <IconFileDollar size={16} />;
        case 'basket':
            return <IconBasket size={16} />;
        case 'box':
            return <IconBox size={16} />;
        case 'forkLift':
            return <IconForklift size={16} />;
        case 'api':
            return <IconApiApp size={16} />;
        // Добавьте другие иконки по необходимости
        default:
            return null;
    }
};

const Menu = () => {
    const { data: menuItems = [], isLoading } = useFetchMenuItemsQuery('', {
        refetchOnMountOrArgChange: true,
    });

    const [showSkeleton, setShowSkeleton] = useState(true);
    const currentPath = usePathname();

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setShowSkeleton(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    const renderMenuItems = (items: MenuItem[]) => {
        return items.map((item) => {
            const itemPath = new URL(item.url).pathname;
            const isActive = currentPath === itemPath;

            // Проверяем, активен ли какой-либо дочерний элемент
            const isChildActive =
                item.children?.some(
                    (child) => new URL(child.url).pathname === currentPath
                ) || false;

            if (item.children && item.children.length > 0) {
                // Рендерим родительский элемент без ссылки
                return (
                    <NavLink
                        key={item.id}
                        label={item.name}
                        leftSection={getIconComponent(item.icon)}
                        childrenOffset={28}
                        active={isActive || isChildActive}
                        defaultOpened={isChildActive}
                        variant="subtle"
                    >
                        {renderMenuItems(item.children)}
                    </NavLink>
                );
            } else {
                // Рендерим конечный элемент с ссылкой
                return (
                    <NavLink
                        key={item.id}
                        label={item.name}
                        leftSection={getIconComponent(item.icon)}
                        component={Link}
                        href={itemPath}
                        active={isActive}
                    />
                );
            }
        });
    };

    if (showSkeleton) {
        return (
            <Box>
                {Array.from({ length: 10 }, (_, index) => (
                    <Flex align="center" gap={16} p="10px 16px" key={index}>
                        <Skeleton height={30} width={30} />
                        <Skeleton height={16} style={{ flex: 1 }} />
                    </Flex>
                ))}
            </Box>
        );
    }

    return <Box>{renderMenuItems(menuItems)}</Box>;
}

export default Menu;