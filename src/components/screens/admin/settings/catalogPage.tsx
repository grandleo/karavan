'use client'

import PageWrapper from "@/components/ui/page/pageWrapper";
import PageHeader from "@/components/ui/page/pageHeader";
import PageContent from "@/components/ui/page/pageContent";
import AddCategoryItem from "@/components/screens/admin/settings/_components/addCategoryItem";
import {useGetCategoriesQuery} from "@/store/api/admin/categories.api";
import classes from "@/components/screens/admin/settings/_components/settings.module.css";
import {Box} from "@mantine/core";
import CategoryItem from "@/components/screens/admin/settings/_components/categoryItem";
import {useEffect, useState} from "react";
import AddProductItem from "@/components/screens/admin/settings/_components/addProductItem";
import {useGetProductsQuery} from "@/store/api/admin/products.api";

const CatalogPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const {data} = useGetCategoriesQuery('');

    const {data: products = []} = useGetProductsQuery(selectedCategory);

    useEffect(() => {
        // const {data: products = []} = useGetProductsQuery(selectedCategory);

        console.log(products)
    }, [selectedCategory]);

    return (
        <PageWrapper>
            <PageHeader title="Номенклатура">
                <AddProductItem selectedCategory={selectedCategory}/>
            </PageHeader>
            <PageContent>
                <Box style={{display: 'flex'}}>
                    <Box className={classes.specificationsBlock}>
                        <AddCategoryItem selectedCategory={selectedCategory}/>
                        {data?.map((item: any, index: number) => (
                            <>
                            <CategoryItem item={item}
                                          key={index}
                                          select={setSelectedCategory}
                            />

                            {/*{item.children.map(child => (*/}
                            {/*<Box style={{marginLeft: '30px'}}>*/}
                            {/*    <CategoryItem item={child} key={child.id} select={setSelectedCategory}/>*/}
                            {/*</Box>*/}
                            {/*))}*/}
                            </>
                        ))}
                    </Box>
                    <Box style={{flexGrow: 1}}>
                        {products?.map((product: any) => {
                            return (
                                <>
                                    <Product product={product}/>
                                </>
                            )
                        })}
                    </Box>
                </Box>
            </PageContent>
        </PageWrapper>
    )


}

const Product = ({product}: any) => {

    return (
        <Box className={classes.specificationItem}>
            <Box>{product.name}</Box>
        </Box>
    )
}

export default CatalogPage;