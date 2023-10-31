import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {modals} from "@mantine/modals";
import classes from "./categoryList.module.css";
import {ActionIcon, Box, Collapse, Menu, rem, Text} from "@mantine/core";
import {useDeleteCategoryMutation, useSetSortingCategoriesMutation} from "@/store/api/admin/categories.api";
import {IconDotsVertical, IconPencil, IconTrash, IconChevronRight, IconChevronDown} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getCategoriesState} from "@/store/slices/categorySlice";
import {useActions} from "@/hooks/useActions";
import {TreeHandle, TreeItem} from "@/components/ui/sortableList/TreeItem";
import {TreeSortable} from "@/components/ui/sortableList/TreeSortable";

interface ICategoryItem {
    id: number;
    name: string;
    parent_id: number;
    children: [];
    category_specifications: [];
}

interface Props {
    item: ICategoryItem;
    onOpen(): void
    setEditCategory?: Dispatch<SetStateAction<ICategoryItem>>;
}

const CategoryItem = ({item, onOpen, setEditCategory}: Props) => {
    const {activeCategory} = useSelector(getCategoriesState);
    const [items, setItems] = useState<ICategoryItem[]>([]);
    const [opened, { toggle }] = useDisclosure(false);

    const [setSortingCategories] = useSetSortingCategoriesMutation();

    const {setActiveCategory, setSelectedCategory, setCategoryIdForProduct} = useActions();

    useEffect(() => {
        if(item.children.length > 0) {
            setItems(item.children)
        }
    }, [item]);

    const onSetSort = (ids: {}) => {
        setSortingCategories(ids).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <>
            {item.children.length > 0 ? (
                <Box>
                    <Box className={`${classes.categoryItem}`} onClick={() => setActiveCategory(item.id)}>
                        <Box>
                            <TreeHandle/>
                        </Box>
                        <Box onClick={toggle}>
                            <CollapseButton opened={opened}/>
                        </Box>
                        <Box className={`${classes.categoryItemName} ${activeCategory === item.id ? classes.activeCategory : null}`}>
                            {item.name}
                        </Box>
                        <Box>
                            <MenuCategory item={item} onOpen={onOpen}/>
                        </Box>
                    </Box>
                    <Collapse in={opened} ml={28}>
                        <TreeSortable items={items} onSortEnd={onSetSort} onChange={setItems} renderItem={(item) => {
                            return (
                                <TreeItem id={item.id}>
                                    <CategoryItem item={item} onOpen={onOpen}/>
                                </TreeItem>
                            )
                        }}/>
                    </Collapse>
                </Box>
            ) : (
                <Box className={`${classes.categoryItem}`} onClick={() => {
                    setActiveCategory(item.id)
                    setSelectedCategory(item.id)
                }}>
                    <Box>
                        <TreeHandle/>
                    </Box>
                    <Box className={`${classes.categoryItemName} ${activeCategory === item.id ? classes.activeCategory : null}`}>
                        {item.name}
                    </Box>
                    <Box>
                        <MenuCategory item={item} onOpen={onOpen}/>
                    </Box>
                </Box>
            )}




            {/*<Box className={`${classes.categoryItem} ${activeCategory === item.id ? classes.activeCategory : null}`} onClick={() => setActiveCategory(item.id)}>*/}
            {/*    <DragHandle/>*/}
            {/*    <Box className={classes.categoryItemName}>*/}
            {/*        {item.children.length > 0 && (*/}
            {/*            <Box onClick={toggle}>*/}
            {/*                <CollapseButton opened={opened}/>*/}
            {/*            </Box>*/}
            {/*        )}*/}
            {/*        <Text>{item.name}</Text>*/}
            {/*    </Box>*/}
            {/*    <Box>*/}
            {/*        <Menu shadow="md" width={200}>*/}
            {/*            <Menu.Target>*/}
            {/*                <ActionIcon variant="default" color="rgba(255, 255, 255, 1)" aria-label="Settings" className={classes.itemMenu}>*/}
            {/*                    <IconDotsVertical/>*/}
            {/*                </ActionIcon>*/}
            {/*            </Menu.Target>*/}

            {/*            <Menu.Dropdown>*/}
            {/*                <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}*/}
            {/*                           onClick={() => {*/}
            {/*                               setEditCategory(item);*/}
            {/*                               onOpen();*/}
            {/*                           }}*/}
            {/*                >*/}
            {/*                    Редактировать*/}
            {/*                </Menu.Item>*/}
            {/*                <Menu.Item*/}
            {/*                    color="red"*/}
            {/*                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}*/}
            {/*                    onClick={openDeleteModal}*/}
            {/*                >*/}
            {/*                    Удалить*/}
            {/*                </Menu.Item>*/}
            {/*            </Menu.Dropdown>*/}
            {/*        </Menu>*/}
            {/*    </Box>*/}

            {/*</Box>*/}

            {/*{item.children.length > 0 && (*/}
            {/*    <Collapse in={opened}>*/}
            {/*        {item.children.map((child: any, index: number) => (*/}
            {/*            <Box style={{marginLeft: '30px'}} key={index}>*/}
            {/*                <CategoryItem item={child} key={child.id} onOpen={onOpen} setEditCategory={setEditCategory} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>*/}
            {/*            </Box>*/}
            {/*        ))}*/}
            {/*    </Collapse>*/}
            {/*)}*/}
        </>
    )
}

interface ICollapseB {
    opened: boolean;
}

const CollapseButton = ({opened}: ICollapseB) => {
    return (
        <>
            {opened ? <IconChevronDown/> : <IconChevronRight/>}
        </>
    )
}

interface IMenuCategoryProps {
    item: any;
    onOpen(): void
}

const MenuCategory = ({item, onOpen}: IMenuCategoryProps) => {
    const [deleteCategory] = useDeleteCategoryMutation();

    const {setEditCategory} = useActions();

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Удалить категорию ?',
            centered: true,
            children: (
                <Text size="sm">
                    Вы собираетесь удалить категорию которая может быть использована в товарах. Что может привести к непредвиденным ситуациям.
                </Text>
            ),
            labels: { confirm: 'Удалить', cancel: "Я передумал" },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteCategory(item.id).unwrap()
                .then((payload) => SuccessNotifications(payload))
                .catch((error) => ErrorNotifications(error))
        });

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <ActionIcon variant="default" color="rgba(255, 255, 255, 1)" aria-label="Settings" className={classes.itemMenu}>
                    <IconDotsVertical/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                           onClick={() => {
                               setEditCategory(item);
                               onOpen();
                           }}
                >
                    Редактировать
                </Menu.Item>
                <Menu.Item
                    color="red"
                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    onClick={openDeleteModal}
                >
                    Удалить
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default CategoryItem;