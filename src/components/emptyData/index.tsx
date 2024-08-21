import {Box, Flex, Text} from "@mantine/core";
import {IconClipboard} from "@tabler/icons-react";
import classes from "./styles.module.css";
import {EmptyDataTypes} from "@/components/emptyData/types";

const EmptyData = ({height, text, children}: EmptyDataTypes) => {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            className={classes.emptyData}
            style={{
                height: height
            }}
        >
            <Box className={classes.emptyDataIcon}>
                <IconClipboard size={40}/>
            </Box>
            <Text mb={16}>{text}</Text>
            {children && children()}
        </Flex>
    )
}

export default EmptyData;