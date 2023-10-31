'use client'

import {useGetCategoriesQuery} from "@/store/api/admin/categories.api";
import {Box, LoadingOverlay} from "@mantine/core";
import classes from  './catalogPage.module.css';
import NoCategories from "@/components/ui/categories/NoCategories";
import CategoriesList from "@/components/ui/categories/CategoriesList";
import ProductsList from "@/components/ui/products/ProductsList";
import {useState} from "react";

const CatalogPage2 = () => {
    const {data: categories = [], isLoading} = useGetCategoriesQuery('');

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                {categories.length === 0 ? <NoCategories/> :
                    <>
                        <Box className={classes.catalogBlock}>
                            <CategoriesList categories={categories}/>

                            <Box className={classes.catalogBlockGrow}>
                                <ProductsList/>
                            </Box>
                        </Box>
                    </>
                }

            </Box>
        </>
    )
}

export default CatalogPage2;