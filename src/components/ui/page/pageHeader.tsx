import {Box, Button, Flex, Text} from "@mantine/core";
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
                            {!!backButton && <Button onClick={handleGoBack}>Назад</Button>}

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