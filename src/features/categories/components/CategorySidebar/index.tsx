import React, {useEffect, useRef, useState} from "react";
import CategoryTree, {Category} from "@/features/categories/components/CategoryTree";
import {ActionIcon, Box, Button, Flex, Group, Modal, Text} from "@mantine/core";
import {IconAdjustments, IconBasketPlus, IconFolderPlus, IconTrash} from "@tabler/icons-react";
import classes from "./CategorySidebar.module.css";
import {useDisclosure} from "@mantine/hooks";
import CategoryForm from "@/features/categories/components/CategoryForm";
import {useDeleteCategoryMutation} from "@/features/categories/api/categoriesApi";

const CategorySidebar = ({initialCategories, selectedCategoryId, setSelectedCategoryId, openedProductForm, openProductForm, closeProductForm}) => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

    // Состояние для модального окна удаления
    const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    // Используем хук удаления категории
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

    useEffect(() => {
        if(initialCategories) {
            setCategories(initialCategories);
        }
    }, [initialCategories]);

    const [openedCategoryForm, { open: openCategoryForm, close: closeCategoryForm }] = useDisclosure(false);

    const handleEdit = (category: Category) => {
        setEditingCategoryId(category.id); // Устанавливаем ID редактируемой категории
        openCategoryForm();
    };

    const handleDelete = (category: Category) => {
        setCategoryToDelete(category);
        openDeleteModal();
    };

    const confirmDelete = async () => {
        if (!categoryToDelete) return;

        try {
            await deleteCategory(categoryToDelete.id).unwrap();
            closeDeleteModal();
            setCategoryToDelete(null);
        } catch (error) {
            console.error("Ошибка при удалении категории:", error);
            // Здесь можно добавить уведомление об ошибке
        }
    };

    const handleDragEnd = (updatedCategories: Category[]) => {
        setCategories(updatedCategories);
    };

    const handleSelectCategory = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
    };

    const handleClearSelection = () => {
        setSelectedCategoryId(null);
    };

    // Создаём реф для CategoryTree
    const categoryTreeRef = useRef<HTMLDivElement>(null);

    // Обработчик двойного клика вне CategoryTree
    const handleDoubleClickOutside = (event: MouseEvent) => {
        if (
            categoryTreeRef.current &&
            !categoryTreeRef.current.contains(event.target as Node)
        ) {
            handleClearSelection();
        }
    };

    useEffect(() => {
        document.addEventListener("dblclick", handleDoubleClickOutside);
        return () => {
            document.removeEventListener("dblclick", handleDoubleClickOutside);
        };
    }, []);

    return (
        <Box>
            <Flex align="center" wrap="nowrap" justify="space-between" mb={16}>
                <Text className={classes.title}>Номеклатура</Text>
                <ActionIcon.Group>
                    <ActionIcon
                        variant="transparent"
                        color="#1B1F3BE5"
                        aria-label="Добавить категорию"
                        className={classes.addButton}
                        onClick={openCategoryForm}
                    >
                        <IconFolderPlus size={16} stroke={1.5}/>
                    </ActionIcon>
                    <ActionIcon
                        variant="transparent"
                        color="#1B1F3BE5"
                        aria-label="Добавить категорию"
                        className={classes.addButton}
                        onClick={openProductForm}
                    >
                        <IconBasketPlus size={16} stroke={1.5}/>
                    </ActionIcon>
                </ActionIcon.Group>
            </Flex>
            <Box ref={categoryTreeRef}>
                <CategoryTree
                    categories={categories}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDragEnd={handleDragEnd}
                    selectedCategoryId={selectedCategoryId}
                    onSelectCategory={handleSelectCategory}
                />
            </Box>
                <CategoryForm opened={openedCategoryForm} close={closeCategoryForm} categoryId={editingCategoryId}/>

            <Modal
                opened={openedDeleteModal}
                onClose={closeDeleteModal}
                title="Подтверждение удаления"
                centered
            >
                <Text>Вы уверены, что хотите удалить категорию "{categoryToDelete?.name}"?</Text>
                <Group p="apart" mt="md">
                    <Button variant="outline" onClick={closeDeleteModal}>
                        Отмена
                    </Button>
                    <Button color="red" onClick={confirmDelete} loading={isDeleting} leftIcon={<IconTrash size={16} />}>
                        Удалить
                    </Button>
                </Group>
            </Modal>
        </Box>
)
}

export default CategorySidebar;