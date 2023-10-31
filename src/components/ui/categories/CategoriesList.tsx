import {ScrollArea, Text} from "@mantine/core";
import classes from "./categoryList.module.css";
import React, {useEffect, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import AddCategoryItem from "@/components/ui/categories/AddCategoryItem";
import CategoryItem from "@/components/ui/categories/CategoryItem";
import UpdateCategoryItem from "@/components/ui/categories/UpdateCategoryItem";
import {TreeItem} from "@/components/ui/sortableList/TreeItem";
import {TreeSortable} from "@/components/ui/sortableList/TreeSortable";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useSetSortingCategoriesMutation} from "@/store/api/admin/categories.api";

interface Props {
    categories: never[];
}

const defaultValues = {
    id: 0,
    name: '',
    parent_id: 0,
    category_specifications: [],
}

interface ICategoryItem {
    id: number;
    name: string;
    parent_id: number;
    children: [];
    category_specifications: [];
}

const CategoriesList = ({categories}: Props) => {
    const [items, setItems] = useState<ICategoryItem[]>(categories);

    const [opened, { open, close }] = useDisclosure(false);

    const [setSortingCategories] = useSetSortingCategoriesMutation();

    useEffect(() => {
        if(categories?.length > 0) {
            setItems(categories)
        }
    }, [categories]);

    const onSetSort = (ids: {}) => {
        setSortingCategories(ids).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }


    return (
        <>
        <ScrollArea className={classes.categoryList}>
            <Text className={classes.categoryListHeader}>Категории товаров</Text>

            <AddCategoryItem/>
            <UpdateCategoryItem isOpen={opened} onClose={close}/>

            <TreeSortable items={items} onSortEnd={onSetSort} onChange={setItems} renderItem={(item: ICategoryItem) => {
                return (
                    <TreeItem id={item.id}>
                        <CategoryItem item={item} onOpen={open}/>
                    </TreeItem>
                )
            }}/>

        </ScrollArea>
        </>
    )
}

export default CategoriesList;