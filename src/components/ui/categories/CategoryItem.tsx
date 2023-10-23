
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {modals} from "@mantine/modals";
import {DragHandle} from "@/components/ui/sortableList/SortableItem";
import classes from "./categoryList.module.css";
import {ActionIcon, Box, Collapse, Menu, rem, Text} from "@mantine/core";
import {useDeleteCategoryMutation} from "@/store/api/admin/categories.api";
import {IconDotsVertical, IconPencil, IconTrash, IconChevronRight, IconChevronDown} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import React, {Dispatch, SetStateAction} from "react";

interface ICategoryItem {
    id: number;
    name: string;
    parent_id: number;
    category_specifications: never[];
}

interface Props {
    item: any;
    onOpen: () => void;
    setEditCategory: Dispatch<SetStateAction<ICategoryItem>>;
    activeCategory: number;
    setActiveCategory: Dispatch<SetStateAction<number>>;
}

const CategoryItem = ({item, onOpen, setEditCategory, activeCategory, setActiveCategory}: Props) => {
    const [opened, { toggle }] = useDisclosure(false);
    const [deleteCategory] = useDeleteCategoryMutation();

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
        <>
            <Box className={`${classes.categoryItem} ${activeCategory === item.id ? classes.activeCategory : null}`} onClick={() => setActiveCategory(item.id)}>
                <DragHandle/>
                <Box className={classes.categoryItemName}>
                    {item.children.length > 0 && (
                        <Box onClick={toggle}>
                            <CollapseButton opened={opened}/>
                        </Box>
                    )}
                    <Text>{item.name}</Text>
                </Box>
                <Box>
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
                </Box>

            </Box>

            {item.children.length > 0 && (
                <Collapse in={opened}>
                    {item.children.map((child: any, index: number) => (
                        <Box style={{marginLeft: '30px'}} key={index}>
                            <CategoryItem item={child} key={child.id} onOpen={onOpen} setEditCategory={setEditCategory} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
                        </Box>
                    ))}
                </Collapse>
            )}
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

export default CategoryItem;