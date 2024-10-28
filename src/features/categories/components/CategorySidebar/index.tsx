import React, {useEffect, useRef, useState} from "react";
import CategoryTree, {Category} from "@/features/categories/components/CategoryTree";
import {ActionIcon, Box, Flex, Group, Text} from "@mantine/core";
import {IconAdjustments, IconBasketPlus, IconFolderPlus} from "@tabler/icons-react";
import classes from "./CategorySidebar.module.css";
import {useDisclosure} from "@mantine/hooks";
import CategoryForm from "@/features/categories/components/CategoryForm";
import ProductForm from "@/features/products/components/ProductForm";

const CategorySidebar = ({initialCategories, selectedCategoryId, setSelectedCategoryId, openedProductForm, openProductForm, closeProductForm}) => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

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

    const handleDelete = (categoryToDelete: Category) => {
        const deleteCategoryRecursively = (cats: Category[]): Category[] => {
            return cats.reduce((acc: Category[], cat) => {
                if (cat.id === categoryToDelete.id) {
                    return acc;
                }
                if (cat.children) {
                    const updatedChildren = deleteCategoryRecursively(cat.children);
                    acc.push({ ...cat, children: updatedChildren });
                } else {
                    acc.push(cat);
                }
                return acc;
            }, []);
        };
        setCategories(deleteCategoryRecursively(categories));
        if (selectedCategoryId === categoryToDelete.id) {
            setSelectedCategoryId(null);
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
        <Box onDoubleClick={(e) => {
            // Снимаем выбор, только если кликнули на пустое пространство
            if (e.target === e.currentTarget) {
                handleClearSelection();
            }
        }}>
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
        </Box>
)
}

export default CategorySidebar;