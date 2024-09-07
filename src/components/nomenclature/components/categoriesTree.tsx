import {useEffect, useState} from "react";
import {TreeSortable} from "@/components/treeSortable";
import {CategoryItem} from "@/components/externalItems";
import {ActionIcon, Flex, ScrollArea, Text, Tooltip} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import CategoryForm from "@/components/nomenclature/components/categoryForm";
import {CategoriesTreeProps, ICategoryTypes} from "@/components/nomenclature/types";
import classes from "@/components/nomenclature/styles.module.css";
import {IconFolderOff, IconFolderPlus} from "@tabler/icons-react";
import {modals} from "@mantine/modals";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useDeleteCategoryMutation, useSortingCategoriesMutation} from "@/store/api/admin/nomenclature.api";

const CategoriesTree = ({
                            categories,
                            activeCategory,
                            setActiveCategory,
                            productSpecifications
                        }: CategoriesTreeProps) => {
    const [opened, {open, close}] = useDisclosure(false);
    const [items, setItems] = useState<ICategoryTypes[]>([]);
    const [editValues, setEditValues] = useState(null);

    const [deleteCategory] = useDeleteCategoryMutation();
    const [sortingCategories] = useSortingCategoriesMutation();

    useEffect(() => {
        if (categories?.length > 0) {
            setItems(categories)
        }
    }, [categories])

    const handleDeleteCategory = (id: number) => {
        modals.openConfirmModal({
            title: 'Удалить категорию ?',
            centered: true,
            children: (
                <Text size="sm">
                    Вы собираетесь удалить категорию, вместе с категорией удалятся её подкатегории и все товары.
                </Text>
            ),
            labels: {confirm: 'Удалить', cancel: "Я передумал"},
            confirmProps: {color: 'red'},
            onConfirm: () => {
                if (activeCategory && activeCategory.id === id) {
                    setActiveCategory(null);
                }
                deleteCategory(id).unwrap()
                    .then((payload) => SuccessNotifications(payload))
                    .catch((error) => ErrorNotifications(error))
            }
        });
    }

    const onSetSort = (ids: {}) => {
        sortingCategories(ids).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    console.log(categories)

    return (
        <>
            <ScrollArea className={classes.nomenclatureCategories}>
                <CategoryForm
                    opened={opened}
                    close={close}
                    activeCategory={activeCategory}
                    editValues={editValues}
                    setEditValues={setEditValues}
                    productSpecifications={productSpecifications}
                />

                <Flex align="center" gap={8} className={classes.nomenclatureCategoryButtons}>
                    <ActionIcon.Group>
                        <Tooltip label="Добавить категорию">
                            <ActionIcon variant="filled" aria-label="Добавить категорию" onClick={open}>
                                <IconFolderPlus stroke={1}/>
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Убрать выбор категории">
                            <ActionIcon variant="default" color="rgba(255, 255, 255, 1)"
                                        aria-label="Убрать выбор категории"
                                        onClick={() => setActiveCategory(null)}>
                                <IconFolderOff stroke={1}/>
                            </ActionIcon>
                        </Tooltip>
                    </ActionIcon.Group>
                </Flex>

                <TreeSortable items={items} onChange={setItems} onSortEnd={onSetSort} renderItem={(item) => {
                    return (
                        <TreeSortable.Item id={item.id}>
                            <CategoryItem
                                item={item}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                                setEditValues={setEditValues}
                                dragHandle={true}
                                open={open}
                                showEdit={true}
                                handleDeleteCategory={handleDeleteCategory}
                                onSetSort={onSetSort}
                            />
                        </TreeSortable.Item>
                    )
                }}/>
            </ScrollArea>
        </>
    )
}

export default CategoriesTree;