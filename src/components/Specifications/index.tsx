'use client'

import classes from "./specifications.module.css";
import {useGetSpecificationsQuery, useSetSortSpecificationMutation} from "@/store/api/admin/specifications.api";
import SimplePage from "@/components/ui/page/SimplePage";
import {useEffect, useState} from "react";
import {ISpecification} from "@/components/Specifications/types";
import SpecificationItem from "@/components/Specifications/ui/SpecificationItem";
import {useDisclosure} from "@mantine/hooks";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {TreeSortable} from "@/components/ui/sortableList/TreeSortable";
import {TreeItem} from "@/components/ui/sortableList/TreeItem";
import AddSpecification from "@/components/Specifications/form/AddSpecofication";
import UpdateSpecification from "@/components/Specifications/form/UpdateSpecification";

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
                <TreeSortable items={items} onChange={setItems} onSortEnd={onSetSort} renderItem={(item) => {
                    return (
                        <TreeItem  id={item.id}>
                            <SpecificationItem item={item} onOpen={open}/>
                        </TreeItem >
                    )
                }}/>

                <UpdateSpecification opened={opened} close={close}/>
            </>
        </SimplePage>
    )
}

export default Specifications;