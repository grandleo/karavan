import {Box, LoadingOverlay, NavLink} from '@mantine/core';
import { IconFolder, IconFolderOpen } from '@tabler/icons-react';
import {useGetCategoriesForSupplierStockQuery} from "@/store/api/supplier/stockSupplier.api";
import {useState} from "react";
import {useActions} from "@/hooks/useActions";

interface CategoriesTreeProps {
}

const CategoriesTree = ({} : CategoriesTreeProps) => {
    const {data: categories, isLoading} = useGetCategoriesForSupplierStockQuery('');

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                {categories?.map((category: any, index: number) => {
                    return (
                        <CategoryItem item={category} key={index}/>
                    )
                })}
            </Box>
        </>
    )
}

interface ICategory {

}

interface CategoryProps {
    item: any,
}

const CategoryItem = ({item}: CategoryProps) => {
    const [open, setOpen] = useState(false);

    const {setSelectedCategorySupplierStock} = useActions();

    return (
        <>
            {item.children.length > 0 ? (
                <NavLink
                label={item.name}
                leftSection={open ? <IconFolderOpen size="1.5rem" stroke={1.5} /> : <IconFolder size="1.5rem" stroke={1.5} />}
                childrenOffset={28}
                onClick={() => setOpen(!open)}
                >
                    {item.children.map((child: any, index: number) => (
                        <CategoryItem item={child} key={index}/>
                    ))}
            </NavLink>
            ) : (
                <NavLink label={item.name} onClick={() => setSelectedCategorySupplierStock(item.id)}/>
            )}
        </>
    )
}

export default CategoriesTree;