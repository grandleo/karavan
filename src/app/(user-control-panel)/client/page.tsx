'use client'

import WarehousesClientPage from "@/components/screens/client/warehousesClientPage";
import {useGetWarehousesQuery} from "@/store/api/warehouses.api";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import _ from "lodash";

export default function ClientDashboard () {
    const router = useRouter();
    const {data: warehouses} = useGetWarehousesQuery('');

    useEffect(() => {
        if(warehouses?.length === 0) {
            router.push(process.env.NEXT_PUBLIC_URL+'/client/settings/warehouses')
        } else {
            const warehouseFirst = _.head(warehouses)

            router.push(process.env.NEXT_PUBLIC_URL+'/client/'+warehouseFirst?.id)
        }

    }, [warehouses]);

    return (
        <>
            <WarehousesClientPage/>
        </>
    )
}