import {useFetchOrderStatusesQuery} from "@/features/statuses/api/statusesApi";
import {Select, Skeleton, Table} from "@mantine/core";
import {useEffect, useState} from "react";
import {Status, StatusListProps} from "@/features/statuses/types/statuses.types";
import {closestCenter, DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import StatusSortableRow from "@/features/statuses/components/StatusSortableRow";
import {restrictToVerticalAxis, restrictToWindowEdges} from "@dnd-kit/modifiers";

const StatusList = ({statuses, onEditStatus} : StatusListProps) => {
    // const {data: statuses, error, isLoading} = useFetchOrderStatusesQuery('');
    const [selectedType, setSelectedType] = useState<string | null>('logistics');
    const [statusItems, setStatusItems] = useState<Status[]>([]);

    // Загружаем данные при изменении статусов
    useEffect(() => {
        if (statuses) {
            setStatusItems(statuses);
        }
    }, [statuses]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setStatusItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Отправляем новую сортировку по API
                const newOrderIds = newItems.map((item) => item.id);
                sendNewOrderToApi(newOrderIds);

                return newItems;
            });
        }
    };

    const sendNewOrderToApi = (newOrderIds) => {
        // Реализуйте ваш API вызов здесь
        // Например:
        // api.updateOrderStatusesOrder(newOrderIds)
    };

    // Фильтрация статусов по типу
    const filteredStatuses = selectedType
        ? statusItems.filter((status: Status) => status.type === selectedType)
        : statusItems;

    return (
        <>
            <Select
                data={[
                    {value: "logistics", label: "Логистика"},
                    {value: "payment", label: "Оплата клиенту"},
                    {value: "payment_supplier", label: "Оплата поставщику"},
                ]}
                placeholder="Выберите тип"
                value={selectedType}
                onChange={setSelectedType}
                checkIconPosition="right"
                allowDeselect={false}
            />
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            >
                <SortableContext
                    items={filteredStatuses.map((status) => status.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th style={{ width: '1%', whiteSpace: 'nowrap' }}></Table.Th>
                                <Table.Th>Название (RU)</Table.Th>
                                <Table.Th>Название (EN)</Table.Th>
                                <Table.Th>Инициатор</Table.Th>
                                <Table.Th>Цвет</Table.Th>
                                <Table.Th style={{ width: '1%', whiteSpace: 'nowrap' }}></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {filteredStatuses.length === 0 ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td>
                                            <Skeleton height={20} width={20} />
                                        </Table.Td>
                                        <Table.Td>
                                            <Skeleton height={10} />
                                        </Table.Td>
                                        <Table.Td>
                                            <Skeleton height={10} />
                                        </Table.Td>
                                        <Table.Td>
                                            <Skeleton height={10} />
                                        </Table.Td>
                                        <Table.Td>
                                            <Skeleton height={10} />
                                        </Table.Td>
                                        <Table.Td>
                                            <Skeleton height={20} width={20} />
                                        </Table.Td>
                                    </Table.Tr>
                                ))
                            ) : (
                                filteredStatuses.map((status) => (
                                    <StatusSortableRow
                                        key={status.id}
                                        id={status.id}
                                        status={status}
                                        onEditStatus={onEditStatus}
                                    />
                                ))
                            )}
                        </Table.Tbody>
                    </Table>
                </SortableContext>
            </DndContext>
        </>
    )
}

export default StatusList;