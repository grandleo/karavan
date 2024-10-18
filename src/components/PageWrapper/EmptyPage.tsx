import {ReactNode} from "react";
import {ActionIcon, Center, Flex, Text} from "@mantine/core";
import {IconMoodEmpty} from "@tabler/icons-react";

interface EmptyPageProps {
    title?: string;
    icon?: ReactNode;
    action?: ReactNode;
}

const EmptyPage = ({title = 'Данных не найдено', icon = <IconMoodEmpty />, action}: EmptyPageProps) => {
    return (
        <Center h="calc(100vh - 116px)">
            <Flex direction="column" gap={16} align="center">
                <ActionIcon variant="light" color="rgba(0, 0, 0, 1)" size="72" radius="50">
                    {icon}
                </ActionIcon>
                <Text size="24px" fw={800}>
                    {title}
                </Text>
                {action}
            </Flex>
        </Center>
    )
}

export default EmptyPage;