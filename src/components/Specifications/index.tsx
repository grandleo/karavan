'use client'

import {useEffect, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {useGetSpecificationsQuery, useSetSortSpecificationMutation} from "@/store/api/admin/specifications.api";
import SimplePage from "@/components/ui/page/SimplePage";
import {TreeSortable} from "@/components/ui/sortableList/TreeSortable";
import {TreeItem} from "@/components/ui/sortableList/TreeItem";
import SpecificationItem from "@/components/Specifications/ui/SpecificationItem";
import AddSpecification from "@/components/Specifications/form/AddSpecofication";
import UpdateSpecification from "@/components/Specifications/form/UpdateSpecification";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {ISpecification} from "@/types/specification";
import EmptyData from "@/components/EmptyData";

const Specifications = () => {
    const [items, setItems] = useState<ISpecification[]>([]);
    const [opened, { open, close }] = useDisclosure(false);

    const {data: specifications} = useGetSpecificationsQuery('');
    const [SetSortSpecification] = useSetSortSpecificationMutation();

    useEffect(() => {
        if(specifications?.length > 0) setItems(specifications)
    }, [specifications]);

    const onSetSort = (ids: {}) => {
        SetSortSpecification(ids).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <SimplePage title="Справочник"
                    headerChildren={() => {
                        return <AddSpecification/>
                    }}>
            <>
                {specifications?.length > 0 ?
                    <TreeSortable items={items} onChange={setItems} onSortEnd={onSetSort} renderItem={(item) => {
                        return (
                            <TreeItem  id={item.id}>
                                <SpecificationItem item={item} onOpen={open}/>
                            </TreeItem >
                        )
                    }}/>
                    : <EmptyData height="calc(100vh - 140px)" text="В данный момент нет добавленых характеристик"/>
                }

                <UpdateSpecification opened={opened} close={close}/>
            </>
        </SimplePage>
    )
}

export default Specifications;