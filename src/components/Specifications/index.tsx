'use client'

import classes from "./specifications.module.css";
import {useGetSpecificationsQuery, useSetSortSpecificationMutation} from "@/store/api/admin/specifications.api";
import SimplePage from "@/components/ui/page/SimplePage";
import {useEffect, useState} from "react";
import {ISpecification} from "@/components/Specifications/types";
import SpecificationItem from "@/components/Specifications/ui/SpecificationItem";
import {useDisclosure} from "@mantine/hooks";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {Button} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";
import {TreeSortable} from "@/components/ui/sortableList/TreeSortable";
import {SortableItem} from "@/components/ui/sortableList/SortableItem";
import {TreeItem} from "@/components/ui/sortableList/TreeItem";
import AddOrUpdateSpecification from "@/components/Specifications/form/AddOrUpdateSpecification";

const defaultValues = {
    id: 0,
    name: '',
    required: 0,
    use_product_name: 0,
    active: 0,
    order_column: 0,
    values_count: 0
}

const Specifications = () => {
    const [items, setItems] = useState<ISpecification[]>([]);
    const [specification, setSpecification] = useState<ISpecification>(defaultValues);
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
                        return (
                            <>
                                <Button onClick={open}>
                                    <IconPlus style={{ width: '70%', height: '70%', marginRight: '10px' }} stroke={1.5} /> Добавить
                                </Button>
                            </>
                        )
                    }}>
            <>
                <TreeSortable items={items} onChange={setItems} onSortEnd={onSetSort} renderItem={(item) => {
                    return (
                        <TreeItem  id={item.id}>
                            <SpecificationItem item={item} onOpen={open} setSpecification={setSpecification}/>
                        </TreeItem >
                    )
                }}/>

                <AddOrUpdateSpecification opened={opened} close={close}/>
            </>
        </SimplePage>
    )
}

export default Specifications;