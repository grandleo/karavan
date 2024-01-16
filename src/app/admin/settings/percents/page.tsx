import type {Metadata} from "next";
import Percents from "@/components/screens/admin/settings/Percents";

export const metadata: Metadata = {
    title: 'Проценты'
}

export default function Page () {

    return (
        <>
            <Percents/>
        </>
    )
}