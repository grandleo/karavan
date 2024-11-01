'use client'

import PageWrapper from "@/components/PageWrapper";
import {ActionIcon, Button, Center, Flex, Group, Modal, Table, Text} from "@mantine/core";
import NomenclatureProductRow from "@/features/products/components/NomenclatureProductRow/NomenclatureProductRow";
import React, {useEffect, useState} from "react";
import CategorySidebar from "@/features/categories/components/CategorySidebar";
import {useFetchTreeCategoriesQuery} from "@/features/categories/api/categoriesApi";
import {useDeleteProductMutation, useLazyFetchProductsByCategoryIdQuery} from "@/features/products/api/productsApi";
import {useDisclosure} from "@mantine/hooks";
import ProductForm from "@/features/products/components/ProductForm";
import {IconApiApp, IconTrash} from "@tabler/icons-react";
import {notify} from "@/utils/notify";

const NomenclaturePage = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const [openedProductForm, { open: openProductForm, close: closeProductForm }] = useDisclosure(false);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);

    const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const {data: categories = []} = useFetchTreeCategoriesQuery('');
    const [triggerProductsByCategoryId, {data: products = [], error, isLoading}] = useLazyFetchProductsByCategoryIdQuery();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    useEffect(() => {
        if(selectedCategoryId) {
            triggerProductsByCategoryId({category_id: selectedCategoryId});
        }
    }, [selectedCategoryId]);

    const handleProductEdit = (id) => {
        setEditingProductId(id); // Устанавливаем ID редактируемой категории
        openProductForm();
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        openDeleteModal();
    };

    const confirmDelete = async () => {
        if (productToDelete) {
            try {
                const response = await deleteProduct(productToDelete.id).unwrap();
                notify(response.message, "success");
                closeDeleteModal();
                setProductToDelete(null);
            } catch (error) {
                const errorMessage = error?.data?.message || 'Ошибка при удалении товара. Пожалуйста, попробуйте еще' +
                    ' раз';
                notify(errorMessage, 'error');
            }
        }
    };

    return (
        <>
            <PageWrapper
                sidebarBg="white"
                sidebarContent={
                    <CategorySidebar
                        initialCategories={categories}
                        selectedCategoryId={selectedCategoryId}
                        setSelectedCategoryId={setSelectedCategoryId}
                        openedProductForm={openedProductForm}
                        openProductForm={openProductForm}
                        closeProductForm={closeProductForm}
                    />
                }
            >
                {selectedCategoryId ? (
                    <>
                        {products.length > 0 ? (
                                <Table>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>№</Table.Th>
                                            <Table.Th>Наименование</Table.Th>
                                            <Table.Th></Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {products.map((product: any) => {
                                            return (
                                                <NomenclatureProductRow
                                                    key={product.id}
                                                    product={product}
                                                    setEditingProductId={setEditingProductId}
                                                    handleProductEdit={handleProductEdit}
                                                    onDelete={handleDeleteClick}
                                                />
                                            )
                                        })}
                                    </Table.Tbody>
                                </Table>
                            ) : (
                                <Center h="calc(100vh - 116px)">
                                    <Flex direction="column" gap={16} align="center">
                                        <ActionIcon variant="light" color="rgba(0, 0, 0, 1)" size="72" radius="50">
                                            <IconApiApp style={{ width: '50%', height: '50%' }} stroke={1.5} />
                                        </ActionIcon>
                                        <Text size="24px" fw={800}>
                                            В данный момент нет добавленных товаров
                                        </Text>
                                    </Flex>
                                </Center>
                            )}</>
                    ) : (
                    <>
                        <Center h="calc(100vh - 116px)">
                            <Flex direction="column" gap={16} align="center">
                                <ActionIcon variant="light" color="rgba(0, 0, 0, 1)" size="72" radius="50">
                                    <IconApiApp style={{ width: '50%', height: '50%' }} stroke={1.5} />
                                </ActionIcon>
                                <Text size="24px" fw={800}>
                                    Выберите категорию
                                </Text>
                            </Flex>
                        </Center>
                    </>
                )}

                <ProductForm opened={openedProductForm} close={closeProductForm} categoryId={selectedCategoryId} editingProductId={editingProductId}/>
                <Modal
                    opened={deleteModalOpened}
                    onClose={closeDeleteModal}
                    title="Подтверждение удаления"
                    centered
                >
                    <Text>Вы уверены, что хотите удалить товар "{productToDelete?.name}"?</Text>
                    <Group p="apart" mt="md">
                        <Button variant="outline" onClick={closeDeleteModal}>
                            Отмена
                        </Button>
                        <Button color="red" onClick={confirmDelete} loading={isDeleting} leftIcon={<IconTrash size={16} />}>
                            Удалить
                        </Button>
                    </Group>
                </Modal>
            </PageWrapper>
        </>
    )
}

export default NomenclaturePage;