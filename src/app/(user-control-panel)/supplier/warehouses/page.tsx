import type {Metadata} from "next";
import SupplierWarehouses from "@/components/pages/warehouses";

export const metadata: Metadata = {
    title: 'Склады'
}

export default function Page()
{
    return <SupplierWarehouses/>
}