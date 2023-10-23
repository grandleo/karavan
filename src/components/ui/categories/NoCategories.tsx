import {Box, Text} from "@mantine/core";
import { IconCurrencyDollar } from '@tabler/icons-react';
import classes from "./categoryList.module.css";
import AddCategoryItem from "@/components/ui/categories/AddCategoryItem";

const NoCategories = () => {
    return (
        <>
            <Box className={classes.noCategories}>
                <Box className={classes.noCategoriesIcon}>
                    <IconCurrencyDollar size={28}/>
                </Box>

                <Box>
                    <Text className={classes.noCategoriesHeader}>Нет категорий</Text>
                </Box>

                <Box>
                    <Text className={classes.noCategoriesText}>Для управления номенклатурой добавьте категорию</Text>
                </Box>

                <Box>
                    <AddCategoryItem/>
                </Box>
            </Box>
        </>
    )
}

export default NoCategories;