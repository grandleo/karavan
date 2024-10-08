'use client'

import SimplePage from "@/components/simplePage";
import {Button} from "@mantine/core";
import {WarehouseForm, WarehousesList} from "@/components/warehouses";
import {useDisclosure} from "@mantine/hooks";
import {
    useCreateWarehouseMutation,
    useDeleteWarehouseMutation,
    useGetWarehousesQuery, useUpdateWarehouseMutation
} from "@/store/api/warehouses.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {FormProvider, useForm} from "react-hook-form";

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

    const [opened, {open, close}] = useDisclosure(false);

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
                warehouses={warehouses}/>

            <FormProvider {...methods}>
                <WarehouseForm isOpen={opened}
                               onClose={close}
                               onAddWarehouse={handleAddWarehouse}
                               onEditWarehouse={handleEditWarehouse}
                               onDelete={handleDeleteWarehouse}/>
            </FormProvider>
        </SimplePage>
    )
}

export default SupplierWarehouses;