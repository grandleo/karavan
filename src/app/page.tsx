import {Metadata} from "next";
import Auth from "@/components/pages/auth";

export const metadata: Metadata = {
    title: 'Karavan.bz',
}

export default function Page() {
    return <Auth/>
}