import {Box, Text} from "@mantine/core";
import { IconCirclePlus } from '@tabler/icons-react';
import classes from "./stock.module.css";

const SelectCategory = () => {
    return (
        <>
            <Box className={classes.selectCategory}>
                <Box className={classes.selectCategoryIcon}>
                    <IconCirclePlus size={28}/>
                </Box>
                <Text className={classes.selectCategoryHeader}>Выберите категорию, из которой хотите добавить товары на склад</Text>
            </Box>
        </>
    )
}

export default SelectCategory;