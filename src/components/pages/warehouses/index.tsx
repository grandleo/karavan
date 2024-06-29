'use client'

import SimplePage from "@/components/simplePage";
import {Button} from "@mantine/core";
import {WarehouseForm, WarehousesList} from "@/components/warehouses";
import {useDisclosure} from "@mantine/hooks";
import {useEffect} from "react";
import {
    useCreateWarehouseMutation,
    useDeleteWarehouseMutation,
    useGetWarehousesQuery, useUpdateWarehouseMutation
} from "@/store/api/warehouses.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useSelector} from "react-redux";
import {getWarehouseState} from "@/store/slices/warehouseSlice";
import {FormProvider, useForm} from "react-hook-form";
import {useActions} from "@/hooks/useActions";

const defaultValues = {
    id: '',
    address: '',
    region_id: null,
    city_id: null,
    type_orders: 'cart'
}

const SupplierWarehouses = () => {
    const methods = useForm({defaultValues});
    const {data: warehouses = [], isLoading} = useGetWarehousesQuery('');
    const [createWarehouseMutation] = useCreateWarehouseMutation();
    const [deleteDeleteWarehouseMutation] = useDeleteWarehouseMutation();
    const [updateWarehouseMutation] = useUpdateWarehouseMutation();
    const {resetWarehouseFormValues} = useActions();

    const [opened, {open, close}] = useDisclosure(false);
    const {editValues} = useSelector(getWarehouseState);

    useEffect(() => {
        if ((!isLoading && warehouses.length === 0) || editValues) {
            open();
        }
    }, [isLoading, warehouses, editValues]);

    const handleAddWarehouse = (data: IWarehouse) => {
        createWarehouseMutation(data).unwrap().then((payload) => {
            SuccessNotifications(payload);
            methods.reset();
            close();
        }).catch((error) => ErrorNotifications(error));
    };

    const handleEditWarehouse = (data: IWarehouse) => {
        updateWarehouseMutation(data).unwrap().then((payload) => {
            SuccessNotifications(payload);
            methods.reset();
            resetWarehouseFormValues('');
            close();
        }).catch((error) => ErrorNotifications(error));
    }

    const handleDeleteWarehouse = async (data: IWarehouse) => {
        deleteDeleteWarehouseMutation(data).unwrap().then((payload) => {
            SuccessNotifications(payload)
        }).catch((error) => ErrorNotifications(error));
    }

    return (
        <SimplePage
            title="Список складов"
            isLoading={isLoading}
            headerChildren={() => {
                return (
                    <Button onClick={() => open()}>Добавить склад</Button>
                )
            }}
        >
            <WarehousesList
                warehouses={warehouses}
                onDelete={handleDeleteWarehouse}/>

            <FormProvider {...methods}>
                <WarehouseForm isOpen={opened}
                               onClose={close}
                               onAddWarehouse={handleAddWarehouse}
                               onEditWarehouse={handleEditWarehouse}/>
            </FormProvider>
        </SimplePage>
    )
}

export default SupplierWarehouses;