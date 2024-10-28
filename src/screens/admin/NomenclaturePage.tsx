'use client'

import PageWrapper from "@/components/PageWrapper";
import {ActionIcon, Center, Flex, Table, Text} from "@mantine/core";
import NomenclatureProductRow from "@/features/products/components/NomenclatureProductRow/NomenclatureProductRow";
import React, {useEffect, useState} from "react";
import CategorySidebar from "@/features/categories/components/CategorySidebar";
import {useFetchTreeCategoriesQuery} from "@/features/categories/api/categoriesApi";
import {useLazyFetchProductsByCategoryIdQuery} from "@/features/products/api/productsApi";
import {useDisclosure} from "@mantine/hooks";
import ProductForm from "@/features/products/components/ProductForm";
import {IconApiApp} from "@tabler/icons-react";

const NomenclaturePage = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const [openedProductForm, { open: openProductForm, close: closeProductForm }] = useDisclosure(false);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);

    const {data: categories = []} = useFetchTreeCategoriesQuery('');
    const [triggerProductsByCategoryId, {data: products = [], error, isLoading}] = useLazyFetchProductsByCategoryIdQuery();

    useEffect(() => {
        if(selectedCategoryId) {
            triggerProductsByCategoryId({category_id: selectedCategoryId});
        }
    }, [selectedCategoryId]);

    const handleProductEdit = (id) => {
        setEditingProductId(id); // Устанавливаем ID редактируемой категории
        openProductForm();
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
                                                <NomenclatureProductRow key={product.id} product={product} setEditingProductId={setEditingProductId} handleProductEdit={handleProductEdit}/>
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
            </PageWrapper>
        </>
    )
}

export default NomenclaturePage;