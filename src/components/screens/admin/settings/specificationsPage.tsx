'use client'

import PageHeader from "../../../ui/page/pageHeader";
import PageContent from "../../../ui/page/pageContent";
import PageWrapper from "../../../ui/page/pageWrapper";
import SpecificationItem from "@/components/screens/admin/settings/_components/specificationItem";
import {Box} from "@mantine/core";
import classes from "./_components/settings.module.css";
import AddSpecificationItem from "@/components/screens/admin/settings/_components/addSpecificationItem";
import {useGetUserQuery} from "@/store/api/user.api";
import {useGetSpecificationsQuery} from "@/store/api/admin/specifications.api";

const SpecificationsPage = () => {
    // const {data, isLoading} = useGetUserQuery('')
    const {data} = useGetSpecificationsQuery('')

    // if(!data) return null

    return (
        <PageWrapper>
            <PageHeader title="Основные характеристики">
                <AddSpecificationItem/>
            </PageHeader>
            <PageContent>
                <Box className={classes.specificationsBlock}>
                    {data?.map((item: any, index: number) => (
                        <SpecificationItem item={item} key={index}/>
                    ))}
                </Box>
            </PageContent>
        </PageWrapper>
    )
}

export default SpecificationsPage;