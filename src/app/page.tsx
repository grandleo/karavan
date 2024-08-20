import {Metadata} from "next";
import Auth from "@/components/pages/auth";
import HomePage from "@/components/pages/home/HomePage";

export const metadata: Metadata = {
    title: 'Karavan.bz',
}

export default function Page() {
    // return <Auth/>
    return <HomePage/>
}