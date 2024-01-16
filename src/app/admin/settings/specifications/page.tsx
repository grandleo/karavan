import type {Metadata} from "next";
import Specifications from "@/components/Specifications";

export const metadata: Metadata = {
    title: 'Справочник'
}

export default function Page () {
    return (
        <>
            <Specifications/>
        </>
    )
}