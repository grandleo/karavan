'use client'

import {useEffect} from "react";
import {LoadingOverlay} from "@mantine/core";
import {useRouter} from "next/navigation";
import {useGetWarehousesQuery} from "@/store/api/warehouses.api";
import _ from "lodash";

const WarehousesClientPage = () => {
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
            <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </>
    )
}

export default WarehousesClientPage;