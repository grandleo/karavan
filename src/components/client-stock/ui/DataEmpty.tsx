import {Box, Flex, Text} from "@mantine/core";
import classes from "../client-stock.module.css";
import {IconClipboard} from "@tabler/icons-react";


export const SelectCategory = () => {
    return (
        <Flex direction="column" align="center" justify="center" className={classes.dataEmpty}>
            <Box className={classes.dataEmptyIcon}>
                <IconClipboard size={40}/>
            </Box>
            <Text>Для получения товаров выберите категорию</Text>
        </Flex>
    )
}

export const EmptyStock = () => {
    return (
        <Flex direction="column" align="center" justify="center" className={classes.dataEmpty}>
            <Box className={classes.dataEmptyIcon}>
                <IconClipboard size={40}/>
            </Box>
            <Text>К сожалению в данном городе нет товаров для стока</Text>
        </Flex>
    )
}