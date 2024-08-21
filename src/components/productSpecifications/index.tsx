'use client'

import SimplePage from "@/components/simplePage";
import {useDisclosure} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {TreeSortable} from "@/components/treeSortable";
import {ISpecificationTypes} from "@/components/productSpecifications/types";
import ProductSpecification from "@/components/productSpecifications/components/productSpecification";
import EmptyData from "@/components/emptyData";
import ProductSpecificationForm from "@/components/productSpecifications/components/productSpecificationForm";
import {
    useDeleteSpecificationMutation,
    useGetProductSpecificationsQuery,
    useSetSortSpecificationMutation
} from "@/store/api/admin/specifications.api";
import {Text} from "@mantine/core";
import {modals} from "@mantine/modals";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";

const ProductSpecifications = () => {
    const [opened, {open, close}] = useDisclosure(false);
    const [items, setItems] = useState<ISpecificationTypes[]>([]);
    const [editValues, setEditValues] = useState<ISpecificationTypes>();

    const {data: productSpecifications, isLoading: isLoadingProductSpecifications} = useGetProductSpecificationsQuery('');

    useEffect(() => {
        if(productSpecifications) {
            setItems(productSpecifications);
        }
    }, [productSpecifications]);

    const [deleteSpecification] = useDeleteSpecificationMutation();
    const [setSortSpecification] = useSetSortSpecificationMutation();

    const handleDeleteSpecification = (id: number) => {
        modals.openConfirmModal({
            title: 'Удалить характеристику ?',
            centered: true,
            children: (
                <Text size="sm">
                    Вы собираетесь удалить характеристику которая может быть использована в категориях и товарах. Что может привести к непредвиденным ситуациям.
                </Text>
            ),
            labels: { confirm: 'Удалить', cancel: "Я передумал" },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteSpecification(id).unwrap()
                .then((payload) => SuccessNotifications(payload))
                .catch((error) => ErrorNotifications(error))
        });
    }

    const onSetSort = (ids: {}) => {
        setSortSpecification(ids).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <SimplePage title="Справочник" isLoading={isLoadingProductSpecifications} headerChildren={() => {
            return (
                <ProductSpecificationForm opened={opened} open={open} close={close} editValues={editValues} setEditValues={setEditValues}/>
            )
        }}>
            {items.length > 0 ?
                <TreeSortable items={items} onChange={setItems} onSortEnd={onSetSort} renderItem={(item: ISpecificationTypes) => {
                    return (
                            <TreeSortable.Item id={item.id}>
                                <ProductSpecification item={item} open={open} setEditValues={setEditValues} handleDeleteSpecification={handleDeleteSpecification}/>
                            </TreeSortable.Item>
                    )
                }} />
                :
                <EmptyData text="Характеристики не добавлены"/>
            }
        </SimplePage>
)
}

export default ProductSpecifications;