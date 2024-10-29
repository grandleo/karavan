import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
    useAddWarehouseMutation,
    useEditWarehouseMutation,
    useLazyFetchWarehouseFormDataQuery,
} from '@/features/warehouses/api/warehousesApi';

interface FormValues {
    id?: number;
    address: string;
    region_id: string | null;
    city_id: string | null;
    type_orders: string;
    delivery_day: string | null;
}

interface Region {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
    warehouse_region_id: number;
}

interface SelectOption {
    label: string;
    value: string;
}

interface CityOption extends SelectOption {
    warehouse_region_id: string;
}

interface UseWarehouseFormProps {
    mode: 'add' | 'edit';
    initialData?: FormValues;
    onSuccess: () => void;
}

const useWarehouseForm = ({ mode, initialData, onSuccess }: UseWarehouseFormProps) => {
    const methods = useForm<FormValues>({
        defaultValues: {
            address: '',
            region_id: null,
            city_id: null,
            type_orders: 'cart',
            delivery_day: ''
        },
    });

    const { handleSubmit, reset } = methods;

    const [addWarehouse, { isLoading: isCreating }] = useAddWarehouseMutation();
    const [editWarehouse, { isLoading: isUpdating }] = useEditWarehouseMutation();

    const [fetchWarehouseFormData, { data: warehouseFormData }] =
        useLazyFetchWarehouseFormDataQuery();

    // Получаем данные формы при монтировании
    useEffect(() => {
        fetchWarehouseFormData('');
    }, [fetchWarehouseFormData]);

    // Обновляем форму при изменении initialData
    useEffect(() => {
        if (initialData) {
            methods.reset(initialData);
            // Устанавливаем region_id и city_id явно
            methods.setValue('region_id', initialData.region_id);
            methods.setValue('city_id', initialData.city_id);
        } else {
            methods.reset({
                address: '',
                region_id: null,
                city_id: null,
                type_orders: 'cart',
            });
        }
    }, [initialData, methods]);

    const selectedRegionId = methods.watch('region_id');

    // Обрабатываем данные регионов и городов
    const regionsData: SelectOption[] = useMemo(
        () =>
            warehouseFormData?.regions.map((region: Region) => ({
                label: region.name,
                value: region.id.toString(),
            })) || [],
        [warehouseFormData]
    );

    const allCitiesData: CityOption[] = useMemo(
        () =>
            warehouseFormData?.cities.map((city: City) => ({
                label: city.name,
                value: city.id.toString(),
                warehouse_region_id: city.warehouse_region_id.toString(),
            })) || [],
        [warehouseFormData]
    );

    // Фильтруем города на основе выбранного региона
    const filteredCities: SelectOption[] = useMemo(() => {
        if (!selectedRegionId) return [];
        return allCitiesData
            .filter((city) => city.warehouse_region_id === selectedRegionId)
            .map(({ label, value }) => ({ label, value }));
    }, [selectedRegionId, allCitiesData]);

    const onSubmit = async (data: FormValues) => {
        try {
            if (mode === 'add') {
                await addWarehouse(data).unwrap();
            } else if (mode === 'edit' && data.id) {
                await editWarehouse(data).unwrap();
            }
            reset();
            onSuccess();
        } catch (error) {
            console.error(
                mode === 'add' ? 'Ошибка при создании склада:' : 'Ошибка при обновлении склада:',
                error
            );
        }
    };

    return {
        methods,
        onSubmit: handleSubmit(onSubmit),
        isCreating,
        isUpdating,
        regionsData,
        filteredCities,
        selectedRegionId,
    };
};

export default useWarehouseForm;