
import {Box, Flex, Text} from "@mantine/core";
import {IconClipboard} from "@tabler/icons-react";
import classes from "./empty-data.module.css";

interface Props {
    height: string | number,
    text: string,
}

const EmptyData = ({height, text} : Props) => {
    return (
        <>
            <Flex direction="column" align="center" justify="center" className={classes.emptyData} style={{
                height: height
            }}>
                <Box className={classes.emptyDataIcon}>
                    <IconClipboard size={40}/>
                </Box>
                <Text>{text}</Text>
            </Flex>
        </>
    )
}

export default EmptyData;