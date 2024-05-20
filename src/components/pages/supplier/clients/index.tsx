'use client'

import {SupplierClientsList} from "@/components/clients";
import {useState} from "react";
import SimplePage from "@/components/simplePage";
import {useChangeSupplierClientStatusMutation, useGetSupplierClientsQuery} from "@/store/api/supplier/supplierClients";
import {useParams} from "next/navigation";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";

const SupplierClients = () => {
    const {id} = useParams<{ id: string; }>();

    const {data: clients, isLoading} = useGetSupplierClientsQuery(id)
    const [changeSupplierClientStatusMutation] = useChangeSupplierClientStatusMutation();

    const handleChangeStatus = async (id: number, status_id: string) => {
        await changeSupplierClientStatusMutation({id: id, status_id: status_id}).unwrap().then((payload) => {
            SuccessNotifications(payload)
        }).catch((error) => ErrorNotifications(error));
    }

    if (isLoading) return null

    return (
        <>
            <SimplePage
                title="Список клиентов"
                isLoading={isLoading}
            >
                <SupplierClientsList clients={clients} handleChangeStatus={handleChangeStatus}/>
            </SimplePage>

        </>
    )
}

export default SupplierClients;