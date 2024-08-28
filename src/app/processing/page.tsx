import {Metadata} from "next";
import {ProcessingScreen} from "@/screens";

export const metadata: Metadata = {
    title: 'Обработка данных',
}

export default function Page() {
    return <ProcessingScreen/>
}