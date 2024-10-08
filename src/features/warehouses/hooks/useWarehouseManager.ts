import { useState, useEffect } from 'react';
import {
    useDeleteWarehouseMutation,
    useLazyFetchWarehouseByIdQuery,
    useLazyFetchWarehousesQuery,
} from '@/features/warehouses/api/warehousesApi';
import { UseFormReturn } from 'react-hook-form';

interface UseWarehouseManagerProps {
    isDrawerOpened: boolean;
    methods: UseFormReturn<any>;
}

const useWarehouseManager = ({ isDrawerOpened, methods }: UseWarehouseManagerProps) => {
    // Состояния
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [warehouseToDelete, setWarehouseToDelete] = useState<number | null>(null);
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [warehouseEditMode, setWarehouseEditMode] = useState<'add' | 'edit'>('add');
    const [editingWarehouseData, setEditingWarehouseData] = useState<any>(null);
    const [isFastCreateOpen, setIsFastCreateOpen] = useState(false);

    // Мутации и запросы
    const [deleteWarehouse] = useDeleteWarehouseMutation();
    const [fetchWarehouses, { data: warehousesData, isFetching }] = useLazyFetchWarehousesQuery();

    const [fetchWarehouseById] = useLazyFetchWarehouseByIdQuery();

    // Получение складов при открытии Drawer
    useEffect(() => {
        if (isDrawerOpened) {
            setShowSkeleton(true);
            fetchWarehouses('');
        } else {
            setShowSkeleton(false);
        }
    }, [isDrawerOpened, fetchWarehouses]);

    // Управление состоянием Skeleton при загрузке данных
    useEffect(() => {
        if (isFetching) {
            setShowSkeleton(true);
        } else {
            const timer = setTimeout(() => {
                setShowSkeleton(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isFetching]);

    // Функции для обработки действий со складами
    const handleOpenDeleteModal = (warehouseId: number) => {
        setWarehouseToDelete(warehouseId);
        setDeleteModalOpened(true);
    };

    const handleConfirmDelete = async () => {
        if (warehouseToDelete !== null) {
            try {
                await deleteWarehouse(warehouseToDelete).unwrap();
                // Обновляем список складов в форме
                methods.setValue(
                    'warehouses',
                    methods.getValues('warehouses').filter((id: number) => id !== warehouseToDelete)
                );
                setDeleteModalOpened(false);
                setWarehouseToDelete(null);
            } catch (error) {
                console.error('Ошибка при удалении склада:', error);
            }
        }
    };

    const handleCancelDelete = () => {
        setDeleteModalOpened(false);
        setWarehouseToDelete(null);
    };

    const handleAddWarehouseClick = () => {
        setWarehouseEditMode('add');
        setEditingWarehouseData(null);
        setIsFastCreateOpen(true);
    };

    const handleEditWarehouse = async (warehouseId: number) => {
        setWarehouseEditMode('edit');
        try {
            const data = await fetchWarehouseById(warehouseId).unwrap();
            setEditingWarehouseData({
                id: data.id,
                address: data.address,
                region_id: data.region_id.toString(),
                city_id: data.city_id.toString(),
                type_orders: data.type_orders,
            });
            setIsFastCreateOpen(true);
        } catch (error) {
            console.error('Ошибка при получении данных склада:', error);
        }
    };

    return {
        showSkeleton,
        warehousesData,
        warehouseToDelete,
        deleteModalOpened,
        warehouseEditMode,
        editingWarehouseData,
        isFastCreateOpen,
        setIsFastCreateOpen,
        handleOpenDeleteModal,
        handleConfirmDelete,
        handleCancelDelete,
        handleAddWarehouseClick,
        handleEditWarehouse,
    };
};

export default useWarehouseManager;