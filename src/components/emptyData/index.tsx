import React from "react";
import {Box, Flex, Text} from "@mantine/core";
import {IconClipboard} from "@tabler/icons-react";
import classes from "./empty-data.module.css";

interface Props {
    height?: string | number,
    text: string,
    subTitle?: string,
    icon?: React.ReactNode,
}

const EmptyData = ({height, text, subTitle, icon} : Props) => {
    return (
        <>
            <Flex direction="column" align="center" justify="center" className={classes.emptyData} style={{
                height: height
            }}>
                <Box className={classes.emptyDataIcon}>
                    {icon ? icon : <IconClipboard size={24}/> }
                </Box>
                <Text className={`${classes.emptyTitle} ${!subTitle && classes.noSubTitle}`}>
                    {text}
                </Text>
                {subTitle && (
                    <Text className={classes.emptySubTitle}>{subTitle}</Text>
                )}
            </Flex>
        </>
    )
}

export default EmptyData;