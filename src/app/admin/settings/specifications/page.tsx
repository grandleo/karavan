import type {Metadata} from "next";
import ProductSpecifications from "@/components/productSpecifications";

export const metadata: Metadata = {
    title: 'Справочник'
}

export default function Page () {
    return <ProductSpecifications/>
}