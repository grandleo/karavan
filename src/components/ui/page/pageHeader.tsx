import {Box, Button, Flex, Text, UnstyledButton} from "@mantine/core";
import { IconChevronLeft } from '@tabler/icons-react';
import classes from './page.module.css';
import {useRouter} from "next/navigation";

interface Props {
    children?: React.ReactNode,
    title: string,
    backButton?: boolean
}

const PageHeader = ({children, title, backButton = false}: Props) => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            <Box className={classes.pageHeaderWrapper}>
                <Flex align="center">
                    <Box>
                        <Flex>
                            {!!backButton &&
                                <UnstyledButton onClick={handleGoBack} className={classes.backButton}>
                                    <IconChevronLeft/>
                                </UnstyledButton>
                            }
                            <Text className={classes.pageHeaderTitle}>{title}</Text>
                        </Flex>
                    </Box>
                    <Box className={classes.pageHeaderAction}>{children}</Box>
                </Flex>
            </Box>
        </>
    )
}

export default PageHeader;