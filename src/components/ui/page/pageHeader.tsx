import {Box, Flex, Text} from "@mantine/core";
import classes from './page.module.css';

interface Props {
    children?: React.ReactNode,
    title: string,
}

const PageHeader = ({children, title}: Props) => {
    return (
        <>
            <Box className={classes.pageHeaderWrapper}>
                <Flex align="center">
                    <Text className={classes.pageHeaderTitle}>{title}</Text>
                    <Box className={classes.pageHeaderAction}>{children}</Box>
                </Flex>
            </Box>
        </>
    )
}

export default PageHeader;