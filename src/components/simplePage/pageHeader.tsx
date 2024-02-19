import {ReactNode} from "react";
import {useRouter} from "next/navigation";
import {Box, Flex, Text, UnstyledButton} from "@mantine/core";
import { IconChevronLeft } from '@tabler/icons-react';
import classes from './page.module.css';

type HeaderChildrenLeftProp = () => JSX.Element | null | undefined;

interface Props {
    children?: ReactNode,
    childrenLeft?(): ReactNode,
    title: string,
    backButton?: boolean
}

const PageHeader = ({children, childrenLeft, title, backButton = false}: Props) => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            <Box className={classes.pageHeaderWrapper}>
                <Flex align="center">
                    <Box>
                        <Flex align="center" gap={24}>
                            {!!backButton &&
                                <UnstyledButton onClick={handleGoBack} className={classes.backButton}>
                                    <IconChevronLeft/>
                                </UnstyledButton>
                            }
                            <Text className={classes.pageHeaderTitle}>{title}</Text>

                            {childrenLeft && childrenLeft()}

                        </Flex>
                    </Box>
                    <Box className={classes.pageHeaderAction}>{children}</Box>
                </Flex>
            </Box>
        </>
    )
}

export default PageHeader;