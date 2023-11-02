'use client'

import {useGetWarehousesQuery} from "@/store/api/warehouses.api";
import {LoadingOverlay} from "@mantine/core";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import _ from "lodash";

const DashboardSupplier = () => {
    const router = useRouter();
    const {data: warehouses} = useGetWarehousesQuery('');

    useEffect(() => {
        if(warehouses?.length === 0) {
            router.push(process.env.NEXT_PUBLIC_URL+'/supplier/settings/warehouses')
        } else {
            const warehouseFirst = _.head(warehouses)

            router.push(process.env.NEXT_PUBLIC_URL+'/supplier/'+warehouseFirst?.id)
        }

    }, [warehouses]);

    return (
        <>
            <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 6 }} />
        </>
    )
}

export default DashboardSupplier;