'use client'

import SimplePage from "@/components/simplePage";
import EmptyData from "@/components/emptyData";
import CategoriesTree from "@/components/nomenclature/components/categoriesTree";
import {Box, Flex, ScrollArea} from "@mantine/core";
import {useEffect, useState} from "react";
import {useGetCategoriesQuery, useGetProductsByCategoryQuery} from "@/store/api/admin/nomenclature.api";
import {useGetProductSpecificationsQuery} from "@/store/api/admin/specifications.api";
import classes from "@/components/nomenclature/styles.module.css";
import ProductsTable from "@/components/nomenclature/components/productsTable";

const Nomenclature = () => {
    const [activeCategory, setActiveCategory] = useState<ICategoryItem | null>(null);
    const [availableSpecifications, setAvailableSpecifications] = useState([]);
    const {data: categories = [], isLoading, refetch: refetchCategories} = useGetCategoriesQuery('');
    const {data: productSpecifications, refetch: refetchProductSpecifications} = useGetProductSpecificationsQuery('');
    const {data: products = [], refetch} = useGetProductsByCategoryQuery(activeCategory ? activeCategory.id : null, {
        skip: activeCategory === null
    });

    useEffect(() => {
        // Обновление категорий и спецификаций при монтировании компонента
        refetchCategories();
        refetchProductSpecifications();
    }, []);

    useEffect(() => {
        // Обновление продуктов при изменении активной категории
        if (activeCategory) {
            refetch();
        }
    }, [activeCategory]);

    useEffect(() => {
        // Обновление availableSpecifications при изменении activeCategory или productSpecifications
        if (activeCategory && activeCategory.categorySpecifications) {
            const specificationIds = activeCategory.categorySpecifications.map(spec => spec.specification_id);

            const newAvailableSpecifications = productSpecifications.map((spec: ICategorySpecification) => {
                const matchingSpec = activeCategory.categorySpecifications.find(
                    catSpec => catSpec.specification_id === spec.id
                );
                if (matchingSpec) {
                    return { ...spec, order_column: matchingSpec.order_column };
                }
                return spec;
            }).filter((spec: ICategorySpecification) => specificationIds.includes(spec.id)).sort((a, b) => a.order_column - b.order_column);

            setAvailableSpecifications(newAvailableSpecifications);
        } else {
            setAvailableSpecifications([]);
        }
    }, [activeCategory, productSpecifications]);

    useEffect(() => {
        // Обновление activeCategory при изменении categories
        if (categories.length > 0 && activeCategory) {
            const updatedActiveCategory = categories.find(cat => cat.id === activeCategory.id);
            if (updatedActiveCategory) {
                setActiveCategory(updatedActiveCategory);
            }
        }
    }, [categories]);

    return (
        <SimplePage
            title="Номенклатура"
            isLoading={isLoading}>
            <>
                <Flex className={classes.nomenclature}>
                    <CategoriesTree
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        productSpecifications={productSpecifications}
                    />

                    <ScrollArea className={classes.nomenclatureProducts}>
                        {categories?.length === 0 ? (
                            <EmptyData text="Нет добавленых категорий"/>
                        ) : (
                            <>
                                {activeCategory === null ? (
                                    <EmptyData text="Выберите категорию" height="calc(100vh - 140px)"/>
                                ) : (
                                    <ProductsTable products={products} activeCategory={activeCategory} availableSpecifications={availableSpecifications}/>
                                )}
                            </>
                        )}
                    </ScrollArea>
                </Flex>

            </>
        </SimplePage>
    )
}

export default Nomenclature;