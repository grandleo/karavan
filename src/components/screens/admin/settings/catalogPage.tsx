'use client'

import PageWrapper from "@/components/ui/page/pageWrapper";
import PageHeader from "@/components/ui/page/pageHeader";
import PageContent from "@/components/ui/page/pageContent";
import AddCategoryItem from "@/components/screens/admin/settings/_components/addCategoryItem";
import {useGetCategoriesQuery} from "@/store/api/admin/categories.api";
import classes from "@/components/screens/admin/settings/_components/settings.module.css";
import {Box} from "@mantine/core";
import CategoryItem from "@/components/screens/admin/settings/_components/categoryItem";

const CatalogPage = () => {
    const {data} = useGetCategoriesQuery('');

    // if(!data) return null

    return (
        <PageWrapper>
            <PageHeader title="Номенклатура">
                <AddCategoryItem/>
            </PageHeader>
            <PageContent>
                <Box className={classes.specificationsBlock}>
                    {data?.map((item: any, index: number) => (
                        <CategoryItem item={item} key={index}/>
                    ))}
                </Box>
            </PageContent>
        </PageWrapper>
    )


}

export default CatalogPage;