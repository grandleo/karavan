'use client'

import {useEffect, useState} from "react";
import PageHeader from "../../../ui/page/pageHeader";
import PageContent from "../../../ui/page/pageContent";
import PageWrapper from "../../../ui/page/pageWrapper";
import {SortableList} from "@/components/ui/sortableList/SortableList";
import {SortableItem} from "@/components/ui/sortableList/SortableItem";
import SpecificationItem from "@/components/ui/specifications/SpecificationItem";
import UpdateSpecificationItem from "@/components/ui/specifications/UpdateSpecificationItem";
import {useDisclosure} from "@mantine/hooks";
import AddSpecificationItem from "@/components/ui/specifications/AddSpecificationItem";
import {useGetSpecificationsQuery, useSetSortSpecificationMutation} from "@/store/api/admin/specifications.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";

interface ISpecification {
    id: number,
    name: string,
    required: number,
    use_product_name: number,
    active: number,
    order_column: number,
    values_count: number,
}

const defaultValues = {
    id: 0,
    name: '',
    required: 0,
    use_product_name: 0,
    active: 0,
    order_column: 0,
    values_count: 0
}

const SpecificationsPage = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [specification, setSpecification] = useState<ISpecification>(defaultValues);

    const {data} = useGetSpecificationsQuery('')
    const [SetSortSpecification] = useSetSortSpecificationMutation();

    const [items, setItems] = useState<ISpecification[]>([]);

    useEffect(() => {
        if(data?.length > 0) setItems(data)
    }, [data]);

    const onSetSort = (ids: {}) => {
        SetSortSpecification(ids).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <PageWrapper>
            <PageHeader title="Основные характеристики">
                <AddSpecificationItem/>
            </PageHeader>
            <PageContent>
                <SortableList items={items} onChange={setItems} onSortEnd={onSetSort} renderItem={(item) => {
                    return (
                        <SortableItem id={item.id}>
                            <SpecificationItem item={item} onOpen={open} setSpecification={setSpecification}/>
                        </SortableItem>
                    )
                }}/>

                <UpdateSpecificationItem isOpen={opened} onClose={close} specification={specification}/>
            </PageContent>
        </PageWrapper>
    )
}

export default SpecificationsPage;