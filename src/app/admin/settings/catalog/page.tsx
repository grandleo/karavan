import type {Metadata} from "next";
import Nomenclature from "@/components/nomenclature";

export const metadata: Metadata = {
    title: 'Номенклатура'
}

export default function Page() {
    return <Nomenclature/>
}