import {Metadata} from "next";
import ApiPage from "@/screens/supplier/ApiPage";

export const metadata: Metadata = {
    title: 'API | Karavan.bz',
}

export default function Page() {
    return <ApiPage/>
}