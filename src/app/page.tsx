import {Metadata} from "next";
import HomePage from "@/screens/HomePage";

export const metadata: Metadata = {
    title: 'Karavan.bz',
}

export default function Page() {
    return <HomePage/>
}