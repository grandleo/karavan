import type {Metadata} from "next";
import CatalogPage2 from "@/components/screens/admin/settings/CatalogPage2";

export const metadata: Metadata = {
    title: 'Номенклатура'
}

export default function Page() {
    return (
        <>
            <CatalogPage2/>
        </>
    )
}