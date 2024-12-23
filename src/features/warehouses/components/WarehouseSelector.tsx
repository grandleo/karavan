import {Select} from "@mantine/core";
import {useFetchWarehousesQuery} from "@/features/warehouses/api/warehousesApi";
import {useWarehouse} from "@/features/warehouses/providers/WarehouseProvider";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Warehouse} from "@/features/warehouses/types/warehouse.types";

const WarehouseSelector = ({setCurrency}) => {
    const {data: warehouses, isLoading} = useFetchWarehousesQuery('', {
        refetchOnMountOrArgChange: true,
    });

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
                    setCurrency(firstWarehouse.currency); // Установить валюту для первого склада
                }
            }
        }
    }, [isLoading, warehouses, selectedWarehouse, setSelectedWarehouse, router]);

    if (isLoading) return <>Loading...</>;

    const options = warehouses.map((warehouse: Warehouse) => ({
        value: String(warehouse.id),
        label: warehouse.name,
    }));

    const handleWarehouseChange = (value: string) => {
        setSelectedWarehouse(value);
        const selected = warehouses.find((warehouse) => String(warehouse.id) === value);
        if (selected) {
            setCurrency(selected.currency); // Установить валюту для выбранного склада
        }
    };

    return (
        <Select
            placeholder="Выберите склад"
            data={options}
            variant="unstyled"
            mb={0}
            value={selectedWarehouse || undefined}
            allowDeselect={false}
            onChange={handleWarehouseChange}
        />
    );
}

export default WarehouseSelector;