import {Box, Text} from "@mantine/core";
import classes from "./categoryList.module.css";
import React, {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import AddCategoryItem from "@/components/ui/categories/AddCategoryItem";
import CategoryItem from "@/components/ui/categories/CategoryItem";
import UpdateCategoryItem from "@/components/ui/categories/UpdateCategoryItem";

interface Props {
    categories: never[];
    activeCategory: number;
    setActiveCategory: Dispatch<SetStateAction<number>>;
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
    category_specifications: never[];
}

const CategoriesList = ({categories, activeCategory, setActiveCategory}: Props) => {
    const [items, setItems] = useState(categories);
    const [editCategory, setEditCategory] = useState<ICategoryItem>(defaultValues)

    const [category, setCategory] = useState(0);
    const [opened, { open, close }] = useDisclosure(false);
    const [specification, setSpecification] = useState();

    useEffect(() => {
        if(categories?.length > 0) {
            setItems(categories)
        }
    }, [categories]);

    // const handleDragEnd = ({ active, over }) => {
    //     if (active.id !== over.id && active.level === over.level) {
    //         const oldIndex = items.findIndex((item) => item.id === active.id);
    //         const newIndex = items.findIndex((item) => item.id === over.id);
    //         const newItems = arrayMove(items, oldIndex, newIndex);
    //         setItems(newItems);
    //     }
    // };

    const onSetSort = () => {

    }


    return (
        <>
        <Box className={classes.categoryList}>
            <Text className={classes.categoryListHeader}>Категории товаров</Text>
            <AddCategoryItem activeCategory={activeCategory}/>
            <UpdateCategoryItem isOpen={opened} onClose={close} category={editCategory}/>

            {categories?.map((category: any, index: number) => {
                return (
                    <CategoryItem item={category} onOpen={open} key={index} setEditCategory={setEditCategory} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
                )
            })}

            {/*<SortableList items={items} onChange={setItems} onSortEnd={onSetSort} renderItem={(item) => {*/}
            {/*    return (*/}
            {/*        <SortableItem id={item.id}>*/}
            {/*            <CategoryItem item={item} onOpen={open} />*/}
            {/*        </SortableItem>*/}
            {/*    )*/}
            {/*}}/>*/}

            {/*<DndContext sensors={sensors}*/}
            {/*            onDragEnd={({ active, over }) => {*/}
            {/*                if (over && active.id !== over?.id) {*/}
            {/*                    const activeIndex = items?.findIndex(({ id }) => id === active.id);*/}
            {/*                    const overIndex = items?.findIndex(({ id }) => id === over.id);*/}

            {/*                    const newSort = arrayMove(items, activeIndex, overIndex);*/}
            {/*                    setItems(newSort);*/}

            {/*                    // if(onSortEnd) onSortEnd(newSort.map(item => item.id))*/}
            {/*                }*/}
            {/*                setActive(null);*/}
            {/*            }}*/}
            {/*            onDragCancel={() => {*/}
            {/*                setActive(null);*/}
            {/*            }}*/}
            {/*>*/}
            {/*    <SortableContext items={items}>*/}
            {/*        {items?.map((category, index) => (*/}
            {/*            <SortableItem id={category.id}>*/}
            {/*                <DragHandle/>*/}
            {/*                <CategoryItem key={category.id} id={category.id} index={index}  name={category.name} />*/}
            {/*            </SortableItem>*/}
            {/*        ))}*/}
            {/*    </SortableContext>*/}
            {/*</DndContext>*/}
        </Box>
        </>
    )
}

export default CategoriesList;