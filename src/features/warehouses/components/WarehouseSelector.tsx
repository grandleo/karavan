import {Select} from "@mantine/core";
import {useFetchWarehousesQuery} from "@/features/warehouses/api/warehousesApi";
import {useWarehouse} from "@/features/warehouses/providers/WarehouseProvider";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Warehouse} from "@/features/warehouses/types/warehouse.types";

const WarehouseSelector = () => {
    const {data: warehouses, isLoading} = useFetchWarehousesQuery('');
    const { selectedWarehouse, setSelectedWarehouse } = useWarehouse();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && warehouses) {
            if (warehouses.length === 0) {
                // Перенаправление, если складов нет
                router.push('/supplier/api');
            } else {
                // Установка первого склада по умолчанию, если ничего не выбрано
                if (!selectedWarehouse) {
                    const firstWarehouse = warehouses[0];
                    setSelectedWarehouse(String(firstWarehouse.id));
                }
            }
        }
    }, [isLoading, warehouses, selectedWarehouse, setSelectedWarehouse, router]);

    if (isLoading) return <>Loading...</>;

    const options = warehouses.map((warehouse: Warehouse) => ({
        value: String(warehouse.id),
        label: warehouse.address,
    }));

    return (
        <Select
            placeholder="Выберите склад"
            data={options}
            variant="unstyled"
            mb={0}
            value={selectedWarehouse || undefined}
            onChange={(value) => setSelectedWarehouse(value)}
        />
    );
}

export default WarehouseSelector;