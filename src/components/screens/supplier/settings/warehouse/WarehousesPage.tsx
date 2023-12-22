'use client'

import React from "react";
import AddWarehouse from "@/components/features/Warehouses/AddWarehouse";
import Page from "@/components/ui/page/SimplePage";

export const WarehousesPage = () => {

    return (
        <>
            <Page title="Адрес точки доставки">
                <AddWarehouse/>
            </Page>
        </>
    )
}