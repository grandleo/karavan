'use client'

import PageWrapper from "@/components/PageWrapper";
import {ActionIcon, Button, Flex, Skeleton, Table} from "@mantine/core";
import {useFetchCurrenciesQuery, useUpdateSortOrderCurrenciesMutation} from "@/features/currencies/api/currenciesApi";
import {IconPencilMinus} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import CurrencyForm from "@/features/currencies/components/CurrencyForm";
import {useEffect, useState} from "react";
import {closestCenter, DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {restrictToVerticalAxis, restrictToWindowEdges} from "@dnd-kit/modifiers";
import CurrencySortableRow from "@/features/currencies/components/CurrencySortableRow";
import {notify} from "@/utils/notify";

const CurrenciesPage = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyItems, setCurrencyItems] = useState([]);

    const {data: currencies, isLoading} = useFetchCurrenciesQuery('', {
        refetchOnMountOrArgChange: true
    });

    const [updateSortOrder] = useUpdateSortOrderCurrenciesMutation();

    useEffect(() => {
        if (currencies) {
            setCurrencyItems(currencies);
        }
    }, [currencies]);

    const openEditForm = (id) => {
        setCurrencyId(id);
        open();
    };

    const openAddForm = () => {
        setCurrencyId(null); // сброс currencyId при добавлении новой валюты
        open();
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Ограничение по перемещению мыши для активации перетаскивания
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setCurrencyItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Обновление порядка на сервере
                const newOrderIds = newItems.map((item) => item.id);
                updateSortOrder(newOrderIds).unwrap();

                return newItems;
            });
        }
    };

    return (
        <PageWrapper
        header={
            <Flex justify="flex-end">
                <Button onClick={openAddForm}>Добавить валюту</Button>
            </Flex>
        }>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            >
            <Table striped stickyHeader>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th>Название</Table.Th>
                        <Table.Th style={{whiteSpace: 'nowrap'}}>Знак валюты</Table.Th>
                        <Table.Th>Действие</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                        <SortableContext items={currencyItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td><Skeleton height={20} width={20} /></Table.Td>
                                        <Table.Td><Skeleton height={10} /></Table.Td>
                                        <Table.Td><Skeleton height={10} /></Table.Td>
                                        <Table.Td><Skeleton height={20} width={20} /></Table.Td>
                                    </Table.Tr>
                                ))
                            ) : (
                                currencyItems.map((currency) => (
                                    <CurrencySortableRow
                                        key={currency.id}
                                        id={currency.id}
                                        currency={currency}
                                        onEditCurrency={openEditForm}
                                    />
                                ))
                            )}
                        </SortableContext>

                </Table.Tbody>
            </Table>
            </DndContext>
            <CurrencyForm opened={opened} close={close} currencyId={currencyId}/>
        </PageWrapper>
    )
}

export default CurrenciesPage;